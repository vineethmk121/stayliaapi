import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { randomValueHex, getMobileJWTToken } from '../../libraries/util';
import { makeApiResponce } from '../../libraries/responce';
import UserModel from '../../models/admin/user.model';
import savePropertyModel from '../../models/admin/savedProperty.model';
import saveAgentModel from '../../models/admin/saveAgent.model';
import propertyModel from '../../models/admin/properties.model';
import { Twilio } from 'twilio';
import { devConfig } from '../../config/config';
import mobileValidation from '../../middlewares/mobile.validation';
import IUser from '../../libraries/interfaces';
import savePropertyData from '../../libraries/interfaces';
import mobilePropertyData from '../../libraries/interfaces';
import saveAgentData from '../../libraries/interfaces';
import userModel from '../../models/admin/user.model';
import propertiesModel from '../../models/admin/properties.model';
import amenitiesModel from '../../models/admin/amenities.model';
import countryModel from '../../models/admin/country.model';
import { finished } from 'nodemailer/lib/xoauth2';
import additionalInfoModel from '../../models/admin/additionalInfo.model';
import overViewsModel from '../../models/admin/overViews.model';
import bedRoomTypeModel from '../../models/admin/bedRoomType.model';
import furnishingTypeModel from '../../models/admin/furnishingType.model';
import tagsModel from '../../models/admin/tags.model';
import agencyModel from '../../models/admin/agency.model';

export default {
    /************** MOBILE AUTH *************/
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            // VALIDATE THE REQUEST
            const { error, value } = mobileValidation.validateMobileSignUpSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const isUserExists = await UserModel.findOne({
                mobile: req.body.mobile
            });
            if (isUserExists) {
                var randomOtp = await randomValueHex('6');
                isUserExists.otp = randomOtp;
                //isUserExists.fcmToken = req.body.fcmToken;
                await isUserExists.save();
                if (devConfig.accountSid && devConfig.authToken && devConfig.myNumber && devConfig.twilioNumber) {
                    var client = new Twilio(devConfig.accountSid, devConfig.authToken);
                    client.messages.create({
                        from: devConfig.twilioNumber,
                        to: devConfig.myNumber,
                        body: `You just received an otp on your cell number!${randomOtp}`
                    });
                    let result = makeApiResponce('OTP Send To User', 1, StatusCodes.OK, {});
                    return res.status(StatusCodes.OK).json(result);
                } else {
                    console.error('You are missing one of the variables you need to send a message');
                }
            } else {
                const user: any = new UserModel(req.body);
                user.userType = 'appUser';
                user.otp = randomOtp!;
                //user.fcmToken = req.body.fcmToken;
                await user.save();
                let result = makeApiResponce('User Created Successfully', 1, StatusCodes.OK, user);
                return res.status(StatusCodes.OK).json(result);
            }
        } catch (error) {
            console.log(error);
            let result = makeApiResponce('Something Goes Wrong', 0, StatusCodes.BAD_REQUEST, {});
            return res.status(StatusCodes.BAD_REQUEST).json(result);
        }
    },
    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        let user = await UserModel.findOne({ mobile: req.body.mobile, delBit: false });
        if (!user) {
            let result = makeApiResponce('Phone Number Not Found', 1, StatusCodes.NOT_FOUND, {});
            return res.status(StatusCodes.NOT_FOUND).json(result);
        }
        if (user.otp != req.body.otp) {
            let result = makeApiResponce('Invalid Credentials', 1, StatusCodes.BAD_REQUEST, {});
            return res.status(StatusCodes.BAD_REQUEST).json(result);
        }
        await user.save();
        //let id = user._id;
        //const deviceToken = await UserModel.findByIdAndUpdate(id, { fcmToken: req.body.fcmToken });
        const token = await getMobileJWTToken({ id: user._id });
        let userResponce;
        userResponce = {
            _id: user._id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            userType: user.userType,
            Mobile: user.mobile,
            gender: user.gender,
            token: token
        };
        let result = makeApiResponce('otp Verified Successfully', 1, StatusCodes.OK, userResponce);
        return res.status(StatusCodes.OK).json(result);
    },
    async resentOtp(req: Request, res: Response, next: NextFunction) {
        let user = await UserModel.findOne({ mobile: req.body.mobile, delBit: false });
        if (!user) {
            let result = makeApiResponce('Phone Number Not Found', 1, StatusCodes.NOT_FOUND, {});
            return res.status(StatusCodes.NOT_FOUND).json(result);
        }
        if (user.otp != req.body.otp) {
            let result = makeApiResponce('Invalid Credentials', 1, StatusCodes.BAD_REQUEST, {});
            return res.status(StatusCodes.BAD_REQUEST).json(result);
        }
        await user.save();
        let id = user._id;
        const deviceToken = await UserModel.findByIdAndUpdate(id, { fcmToken: req.body.fcmToken });
        const token = await getMobileJWTToken({ id: user._id });
        let userResponce;
        userResponce = {
            _id: user._id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            userType: user.userType,
            Mobile: user.mobile,
            gender: user.gender,
            token: token
        };
        let result = makeApiResponce('otp Verified Successfully', 1, StatusCodes.OK, userResponce);
        return res.status(StatusCodes.OK).json(result);
    },
    async socialSignIn(req: Request, res: Response, next: NextFunction) {
        try {
            // VALIDATE THE REQUEST
            const { error, value } = mobileValidation.validateSocialSignUpSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let isUserExists = await UserModel.findOne({
                email: req.body.email
            });
            if (isUserExists) {
                isUserExists.socialToken = req.body.socialToken;
                await isUserExists.save();
                const token = await getMobileJWTToken({ id: isUserExists._id });
                let userResponce: any = {
                    _id: isUserExists._id,
                    fullName: isUserExists.fName,
                    lName: isUserExists.lName,
                    email: isUserExists.email,
                    dateOfBirth: isUserExists.dateOfBirth,
                    userType: isUserExists.userType,
                    Mobile: isUserExists.mobile,
                    gender: isUserExists.gender,
                    token: token
                };
                let result = makeApiResponce('Successfully', 1, StatusCodes.OK, userResponce);
                return res.status(StatusCodes.OK).json(result);
            } else if (!isUserExists) {
                let checkSocialUser = await UserModel.findOne({
                    socialToken: req.body.socialToken
                });
                if (checkSocialUser) {
                    const token = await getMobileJWTToken({ id: checkSocialUser._id });
                    let userResponce: any = {
                        _id: checkSocialUser._id,
                        fName: checkSocialUser.fName,
                        lName: checkSocialUser.lName,
                        email: checkSocialUser.email,
                        dateOfBirth: checkSocialUser.dateOfBirth,
                        userType: checkSocialUser.userType,
                        Mobile: checkSocialUser.mobile,
                        gender: checkSocialUser.gender,
                        token: token
                    };
                    let socialResult = makeApiResponce('Successfully', 1, StatusCodes.OK, userResponce);
                    return res.status(StatusCodes.OK).json(socialResult);
                } else {
                    const socialUser: any = new UserModel(req.body);
                    socialUser.userType = 'appUser';
                    await socialUser.save();
                    const token = await getMobileJWTToken({ id: socialUser._id });
                    let userResponce: any = {
                        _id: socialUser._id,
                        fName: socialUser.fName,
                        lName: socialUser.lName,
                        email: socialUser.email,
                        dateOfBirth: socialUser.dateOfBirth,
                        userType: socialUser.userType,
                        Mobile: socialUser.mobile,
                        gender: socialUser.gender,
                        token: token
                    };
                    let result = makeApiResponce('User Created Successfully', 1, StatusCodes.OK, userResponce);
                    return res.status(StatusCodes.OK).json(result);
                }
            }
        } catch (error) {
            console.log(error);
            let result = makeApiResponce('Something Goes Wrong', 0, StatusCodes.BAD_REQUEST, {});
            return res.status(StatusCodes.BAD_REQUEST).json(result);
        }
    },
    /************** PROFILE SETTING *************/
    async viewProfile(req: Request, res: Response, next: NextFunction) {
        try {
            // FETCH THE USER
            var user: IUser = await UserModel.findById(req.params.id).select('-password').populate('country').lean();
            if (!user) {
                let result = makeApiResponce('User Not Found', 1, StatusCodes.NOT_FOUND, user);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('User Founds Successfully', 1, StatusCodes.OK, user);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            // FETCH THE USER
            req.body.updatedBy = req.user;
            if (req.file) {
                req.body.profilePic = `${devConfig.getImagesPath.mobileUser}/` + req.file.filename;
            }
            var user: IUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!user) {
                let result = makeApiResponce('User Not Exists', 0, StatusCodes.NOT_FOUND, user);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('User Updated Successfully', 1, StatusCodes.OK, user);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    /************** PROPERTY MODULES *************/
    async addProperty(req: any, res: Response, next: NextFunction) {
        try {
            const { error, value } = mobileValidation.validatePropertySchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const checkProperty: mobilePropertyData = await propertyModel.findOne({ title: req.body.title }).lean();
            if (checkProperty) {
                let result = makeApiResponce('This Property is Already Exsit, Please try another property!', 0, StatusCodes.CONFLICT, {});
                return res.status(StatusCodes.CONFLICT).json(result);
            }
            const property: mobilePropertyData = new propertyModel(req.body);
            property.createdBy = req.user;
            if (req.files) {
                for (var i = 0; i < req.files.length; i++) {
                    if (req.files[i].fieldname == 'gallaryImages') {
                        property.gallaryImages = `${devConfig.getImagesPath.gallaryImages}/` + req.files[i].filename;
                    }
                    if (req.files[i].fieldname == 'sliderImages') {
                        property.sliderImages = `${devConfig.getImagesPath.sliderImages}/` + req.files[i].filename;
                    }
                    if (req.files[i].fieldname == 'propertyPlan') {
                        property.propertyPlan = `${devConfig.getImagesPath.propertyPlan}/` + req.files[i].filename;
                    }
                }
            }
            await property.save();
            var propertyResponce: any = {
                _id: property._id,
                title: property.title,
                description: property.description,
                flatNumber: property.flatNumber,
                street: property.street,
                city: property.city,
                state: property.state,
                country: property.country,
                countryCode: property.countryCode,
                sellingPrice: property.sellingPrice,
                discountPrice: property.discountPrice,
                deposite: property.deposite,
                rent: property.rent,
                additionalInfo: property.additionalInfo,
                propertyType: property.propertyType,
                overView: property.overView,
                amenities: property.amenities,
                bedRoomTypes: property.bedRoomTypes,
                furnishingTypes: property.furnishingTypes,
                tags: property.tags,
                gallaryImages: property.gallaryImages,
                sliderImages: property.sliderImages,
                propertyPlan: property.propertyPlan,
                agency: property.agency,
                agent: property.agent,
                createdBy: property.createdBy
            };
            let result = makeApiResponce('New Property Added Successfully', 1, StatusCodes.OK, propertyResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewProperty(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyCheck: mobilePropertyData = await propertyModel
                .findById(req.params.id)
                .populate('country')
                .populate('tags')
                .populate('furnishingTypes')
                .populate('bedRoomTypes')
                .populate('amenities')
                .populate('overView')
                .populate('additionalInfo')
                .lean();
            if (!propertyCheck) {
                let result = makeApiResponce('Property Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Property Founds Successfully', 1, StatusCodes.OK, propertyCheck);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllProperties(req: Request, res: Response, next: NextFunction) {
        try {
            var propertyCheck: mobilePropertyData = await propertyModel
                .find({ delBit: false })
                .populate('country')
                .populate('tags')
                .populate('furnishingTypes')
                .populate('bedRoomTypes')
                .populate('amenities')
                .populate('overView')
                .populate('additionalInfo')
                .lean();
            if (!propertyCheck) {
                let result = makeApiResponce('Property Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Property Founds Successfully', 1, StatusCodes.OK, propertyCheck);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateProperty(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var propertyCheck: mobilePropertyData = await propertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!propertyCheck) {
                let result = makeApiResponce('Property Not Exists', 0, StatusCodes.NOT_FOUND, propertyCheck);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Property Updated Successfully', 1, StatusCodes.OK, propertyCheck);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteProperty(req: Request, res: Response, next: NextFunction) {
        try {
            var propertyCheck: mobilePropertyData = await propertyModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!propertyCheck) {
                let result = makeApiResponce('This Property Not Exists', 0, StatusCodes.NOT_FOUND, propertyCheck);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Property Deleted Successfully', 1, StatusCodes.OK, propertyCheck);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async savePropertyByUser(req: Request, res: Response, next: NextFunction) {
        try {
            let checkSaveProperty: savePropertyData = await savePropertyModel.findOne({ userId: req.user, propertyId: req.body.propertyId }).populate('propertyId').populate('userId').lean();
            if (checkSaveProperty) {
                let result = makeApiResponce('This Property already saved', 0, StatusCodes.CONFLICT, checkSaveProperty);
                return res.status(StatusCodes.CONFLICT).json(result);
            }
            let savingProduct = new savePropertyModel({
                userId: req.user,
                propertyId: req.body.propertyId
            });
            await savingProduct.save();
            let result = makeApiResponce('Property has been saved!', 1, StatusCodes.OK, savingProduct);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async unSavePropertyByUser(req: Request, res: Response, next: NextFunction) {
        try {
            let checkSaveProperty: savePropertyData = await savePropertyModel.findById(req.params.id).lean();
            if (!checkSaveProperty) {
                let result = makeApiResponce('Property is not saved', 0, StatusCodes.NOT_FOUND, checkSaveProperty);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let unsaveProperty: any = await savePropertyModel.findByIdAndDelete(req.params.id);
            let result = makeApiResponce('This Property Deleted Successfully!', 1, StatusCodes.OK, unsaveProperty);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async listOfSaveProperties(req: Request, res: Response, next: NextFunction) {
        try {
            let getSaveProperties: savePropertyData = await savePropertyModel.find({ userId: req.user }).populate('propertyId').populate('userId').lean();
            if (!getSaveProperties) {
                let result = makeApiResponce('Properties not Found', 0, StatusCodes.NOT_FOUND, getSaveProperties);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('List of Properties Successfully!', 1, StatusCodes.OK, getSaveProperties);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async listOfPropertiesAgainstSaleType(req: Request, res: Response, next: NextFunction) {
        try {
            let getProperties: savePropertyData = await propertiesModel
                .find({ propertySaleType: req.body.propertySaleType })
                .populate('propertyId')
                .populate('agent')
                .populate('amenities')
                .populate('country')
                .populate('additionalInfo')
                .populate('overView')
                .populate('bedRoomTypes')
                .populate('furnishingTypes')
                .populate('tags')
                .lean();
            if (!getProperties) {
                let result = makeApiResponce('Properties Not Found', 0, StatusCodes.NOT_FOUND, getProperties);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('List of Properties Successfully!', 1, StatusCodes.OK, getProperties);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async filterProperties(req: Request, res: Response, next: NextFunction) {
        try {
            let agent = await userModel.find({ userType: 'agent' }).lean();
            var agentIds;
            for (let i = 0; i < agent.length; i++) {
                agentIds = agent[i]._id;
            }
            let amenities = await amenitiesModel.find({ _id: req.body.amenityId, delBit: false }).lean();
            var amenityIds;
            for (let i = 0; i < amenities.length; i++) {
                amenityIds = amenities[i]._id;
            }
            let country = await countryModel.find({ _id: req.body.countryId, delBit: false }).lean();
            var countryIds;
            for (let i = 0; i < country.length; i++) {
                countryIds = country[i]._id;
            }
            let additionalInfo = await additionalInfoModel.find({ _id: req.body.additionalInfoId, delBit: false }).lean();
            var additionalInfoIds;
            for (let i = 0; i < additionalInfo.length; i++) {
                additionalInfoIds = additionalInfo[i]._id;
            }
            let overView = await overViewsModel.find({ _id: req.body.overViewId, delBit: false }).lean();
            var overViewIds;
            for (let i = 0; i < overView.length; i++) {
                overViewIds = overView[i]._id;
            }
            let bedRoomType = await bedRoomTypeModel.find({ _id: req.body.bedRoomTypeId, delBit: false }).lean();
            var bedRoomTypeIds;
            for (let i = 0; i < bedRoomType.length; i++) {
                bedRoomTypeIds = bedRoomType[i]._id;
            }
            let furnishType = await furnishingTypeModel.find({ _id: req.body.furnishingTypeId, delBit: false }).lean();
            var furnishTypeIds;
            for (let i = 0; i < furnishType.length; i++) {
                furnishTypeIds = furnishType[i]._id;
            }
            let tag = await tagsModel.find({ _id: req.body.tagId, delBit: false }).lean();
            var tagIds;
            for (let i = 0; i < tag.length; i++) {
                tagIds = tag[i]._id;
            }
            let agency = await agencyModel.find({ _id: req.body.agencyId, delBit: false }).lean();
            var agencyIds;
            for (let i = 0; i < agency.length; i++) {
                agencyIds = agency[i]._id;
            }
            let query = {
                $or: [
                    { agent: agentIds },
                    { amenities: amenityIds },
                    { country: countryIds },
                    { additionalInfo: additionalInfoIds },
                    { overView: overViewIds },
                    { bedRoomTypes: bedRoomTypeIds },
                    { furnishTypes: furnishTypeIds },
                    { tags: tagIds },
                    { agency: agencyIds }
                ]
            };
            let getProperties = await propertiesModel
                .find(query)
                .populate('propertyId')
                .populate('agent')
                .populate('amenities')
                .populate('country')
                .populate('additionalInfo')
                .populate('overView')
                .populate('bedRoomTypes')
                .populate('furnishingTypes')
                .populate('tags')
                .lean();
            if (!getProperties) {
                let result = makeApiResponce('Properties Not Found', 0, StatusCodes.NOT_FOUND, getProperties);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('List of Properties Successfully!', 1, StatusCodes.OK, getProperties);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },

    /************** AGENT SAVE/UNSAVE ************/
    async saveAgentByUser(req: Request, res: Response, next: NextFunction) {
        try {
            let checkSaveAgent: saveAgentData = await saveAgentModel.findOne({ userId: req.user, agentId: req.body.agentId }).populate('propertyId').populate('userId').lean();
            if (checkSaveAgent) {
                let result = makeApiResponce('This Agent already saved', 1, StatusCodes.CONFLICT, checkSaveAgent);
                return res.status(StatusCodes.CONFLICT).json(result);
            }
            let savingAgent = new saveAgentModel({
                userId: req.user,
                agentId: req.body.agentId
            });
            await savingAgent.save();
            let result = makeApiResponce('Agent has been saved!', 1, StatusCodes.OK, savingAgent);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async unSaveAgentByUser(req: Request, res: Response, next: NextFunction) {
        try {
            let checkSaveAgent: savePropertyData = await saveAgentModel.findById(req.params.id).lean();
            if (!checkSaveAgent) {
                let result = makeApiResponce('Agent is not saved', 0, StatusCodes.NOT_FOUND, checkSaveAgent);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let unsaveAgent: any = await saveAgentModel.findByIdAndDelete(req.params.id);
            let result = makeApiResponce('This Agent Deleted Successfully!', 1, StatusCodes.OK, unsaveAgent);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async listOfSaveAgents(req: Request, res: Response, next: NextFunction) {
        try {
            let getSaveAgents: savePropertyData = await saveAgentModel.find({ userId: req.user }).populate('propertyId').populate('userId').lean();
            if (!getSaveAgents) {
                let result = makeApiResponce('Agents not Found', 0, StatusCodes.NOT_FOUND, getSaveAgents);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('List of Agents Successfully!', 1, StatusCodes.OK, getSaveAgents);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async propertiesWithAmenities(req: Request, res: Response, next: NextFunction) {
        try {
            let checkpropertiesAmenities = await propertiesModel.find({ _id: req.body.propertyId, amenities: req.body.amenityId }).populate('propertyId').populate('amenities').lean();
            if (!checkpropertiesAmenities) {
                let result = makeApiResponce('properties With Amenities not Found', 0, StatusCodes.NOT_FOUND, checkpropertiesAmenities);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('List of properties With Amenities Found Successfully!', 1, StatusCodes.OK, checkpropertiesAmenities);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async listOfPropertiesAgaintAgent(req: Request, res: Response, next: NextFunction) {
        try {
            let checklistOfPropertiesAgaintAgent: mobilePropertyData = await propertiesModel
                .find({ agent: req.body.agentId })
                .populate('agent')
                .populate('amenities')
                .populate('country')
                .populate('additionalInfo')
                .populate('overView')
                .populate('bedRoomTypes')
                .populate('furnishingTypes')
                .populate('tags')
                .lean();
            if (!checklistOfPropertiesAgaintAgent) {
                let result = makeApiResponce('properties Against AgentID not Found', 0, StatusCodes.NOT_FOUND, checklistOfPropertiesAgaintAgent);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('List of properties Against AgentID Found Successfully!', 1, StatusCodes.OK, checklistOfPropertiesAgaintAgent);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
