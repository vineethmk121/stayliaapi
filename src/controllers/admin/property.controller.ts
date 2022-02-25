import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import propertyModel from '../../models/admin/properties.model';
import { makeApiResponce } from '../../libraries/responce';
import propertyData from '../../libraries/interfaces';
import { devConfig } from '../../config/config';

export default {
    async addProperty(req: any, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validatePropertySchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const checkProperty: propertyData = await propertyModel.findOne({ title: req.body.title }).lean();
            if (checkProperty) {
                let result = makeApiResponce('This Property is Already Exsit, Please try another property!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const property: propertyData = new propertyModel(req.body);
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
            const propertyCheck: propertyData = await propertyModel
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
            var propertyCheck: propertyData = await propertyModel
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
            var propertyCheck: propertyData = await propertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!propertyCheck) {
                let result = makeApiResponce('Property Not Exists', 1, StatusCodes.BAD_REQUEST, propertyCheck);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
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
            var propertyCheck: propertyData = await propertyModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!propertyCheck) {
                let result = makeApiResponce('This Property Not Exists', 1, StatusCodes.BAD_REQUEST, propertyCheck);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Property Deleted Successfully', 1, StatusCodes.OK, propertyCheck);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
