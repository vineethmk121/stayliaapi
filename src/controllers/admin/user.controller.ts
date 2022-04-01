import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import validation from '../../middlewares/user.validation';
import UserModel from '../../models/admin/user.model';
import { getJWTToken, getEncryptedPassword } from '../../libraries/util';
import { sendEmail } from '../../libraries/mail';
import { makeApiResponce } from '../../libraries/responce';
import randomstring from 'randomstring';
import IUser from '../../libraries/interfaces';
import { devConfig } from '../../config/config';

export default {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            // VALIDATE THE REQUEST
            const { error, value } = validation.validateSignupSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingUser = await UserModel.findOne({ email: req.body.email });
            if (existingUser) {
                let result = makeApiResponce('Email is Already Exsit', 1, StatusCodes.BAD_REQUEST, existingUser);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const user: IUser = new UserModel(req.body);
            const hash = await getEncryptedPassword(req.body.password);
            user.password = hash;
            await user.save();
            var userResponce: any = {
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                userType: user.userType,
                gender: user.gender,
                mobile: user.mobile,
                dateOfBirth: user.dateOfBirth,
                profilePic: user.profilePic,
                parentAgency: user.parentAgency,
                building: user.building,
                state: user.state,
                locality: user.locality,
                country: user.country
            };

            let result = makeApiResponce('User Created Successfully', 1, StatusCodes.OK, userResponce);
            return res.json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, userResponce);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async addUser(req: Request, res: Response, next: NextFunction) {
        try {
            // VALIDATE THE REQUEST
            const { error, value } = validation.validateSignupSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingUser = await UserModel.findOne({ email: req.body.email }).lean();
            if (existingUser) {
                let result = makeApiResponce('This Email is Already Exsit, Please try another Email!', 1, StatusCodes.BAD_REQUEST, existingUser);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const user: IUser = new UserModel(req.body);
            user.createdBy = req.user;
            if (req.file) {
                user.profilePic = `${devConfig.getImagesPath.userProfilePic}/` + req.file.filename;
            }
            const hash = await getEncryptedPassword(req.body.password);
            user.password = hash;
            await user.save();
            var userResponce: any = {
                _id: user._id,
                fName: user.fName,
                lName: user.lName,
                email: user.email,
                userType: user.userType,
                gender: user.gender,
                mobile: user.mobile,
                dateOfBirth: user.dateOfBirth,
                profilePic: user.profilePic,
                parentAgency: user.parentAgency,
                building: user.building,
                state: user.state,
                locality: user.locality,
                roleId: user.roleId,
                country: user.country,
                createdBy: user.createdBy
            };
            let result = makeApiResponce('User Created Successfully', 1, StatusCodes.OK, userResponce);
            var emailConfirmation: IUser = await UserModel.findOne({ email: req.body.email }).lean();
            if (emailConfirmation.emailVerified == 'true') {
                let result = makeApiResponce('User Already Verified!', 1, StatusCodes.OK, { emailConfirmation });
            } else if (emailConfirmation.emailVerified != 'false') {
                const userId = emailConfirmation._id;
                const link = `http://localhost:5555/verifyEmail/${user._id}`;
                const confirmationLink = `<img style="width: 150px;" src="https://api.metomasnota.com/maillogo.png">
                    <h4>Hi ${emailConfirmation.fName}</h4>
                    <p>Here is your confirmation Email link.Click here. <span style="font-weight:bold">${link}</span> Please Verify Your Email!</a></p>`;

                const mailResponce = await sendEmail({
                    html: confirmationLink,
                    subject: 'Please Verify Your Email!',
                    email: emailConfirmation.email
                });
                console.log(mailResponce);
                let result = makeApiResponce('Pending Account! Verification Link sent to your Email, Please Verify Your Email!', 1, StatusCodes.OK, {});
                return res.status(StatusCodes.OK).json(result);
            }
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewUser(req: Request, res: Response, next: NextFunction) {
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
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            // FETCH THE USER
            // var user: IUser = await UserModel.findOne({ userType: req.body.userType, delBit: false }).select('-password').lean();
            var user: IUser = await UserModel.find({ delBit: false }).select('-password').lean();
            if (!user) {
                let result = makeApiResponce('Users Not Found', 1, StatusCodes.NOT_FOUND, user);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Users Found Successfully', 1, StatusCodes.OK, user);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            // FETCH THE USER
            req.body.updatedBy = req.user;
            var user: IUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!user) {
                let result = makeApiResponce('User Not Exists', 1, StatusCodes.BAD_REQUEST, user);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('User Updated Successfully', 1, StatusCodes.OK, user);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            // FETCH THE USER
            var user: IUser = await UserModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!user) {
                let result = makeApiResponce('User Not Exists', 1, StatusCodes.BAD_REQUEST, user);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('User Deleted Successfully', 1, StatusCodes.OK, user);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async apiLogin(req: Request, res: Response, next: NextFunction) {
        try {
            // VALIDATE THE REQUEST
            const { error, value } = validation.validateLoginSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            // FETCH THE USER
            const userQuery = { email: req.body.email };
            var user: any = await UserModel.findOne(userQuery);
            // let user =  await UserModel.findOne({email: value.email},{userType: value.userType});
            if (!user) {
                let result = makeApiResponce('Invalid Email and Passowrd', 1, StatusCodes.BAD_REQUEST, user);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            var matched = await bcryptjs.compare(req.body.password, user.password);
            if (!matched) {
                let result = makeApiResponce('invalid Credential', 1, StatusCodes.BAD_REQUEST, user);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }

            const token = await getJWTToken({ id: user._id });
            var userResponce: any = {
                userId: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                token: token
            };
            let result = makeApiResponce('LoggedIn Successfully', 1, StatusCodes.OK, userResponce);
            return res.json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, userResponce);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async changePassword(req: any, res: Response, next: NextFunction) {
        try {
            // CHECK THE USER
            var findUser: any = await UserModel.findById(req.currentUser['_id']);
            if (!findUser) {
                let result = makeApiResponce('User Not Found!', 0, StatusCodes.OK, findUser);
                return res.json(result);
            }
            // CHECK THE OLD PASSWORD
            const matched = await bcryptjs.compare(req.body.oldPassword, findUser.password);
            if (!matched) {
                let result = makeApiResponce('Current Password Incorrect', 0, StatusCodes.OK, findUser);
                return res.json(result);
            }

            // UPDATE THE USER
            const hash = await getEncryptedPassword(req.body.newPassword);
            findUser.password = hash;
            await findUser.save();
            var userResponce: any = {
                _id: findUser._id,
                name: findUser.name,
                email: findUser.email
            };

            let result = makeApiResponce('Password Change Successfully', 1, StatusCodes.OK, userResponce);
            return res.json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, userResponce);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async forgotPassword(req: any, res: Response, next: NextFunction) {
        try {
            const findUser: any = await UserModel.findOne({ email: req.body.email });
            if (!findUser) {
                let result = makeApiResponce('Invalid Email Address.', 0, StatusCodes.OK, findUser);
                return res.json(result);
            }
            var randomPassword = randomstring.generate({
                length: 12,
                charset: 'hex'
            });
            const hash = await getEncryptedPassword(randomPassword);
            findUser.password = hash;
            await findUser.save();

            const passwordLink = `<img style="width: 150px;" src="https://api.metomasnota.com/maillogo.png">
                    <h4>Hi ${findUser.name}</h4>
                    <p>Here is your new password <span style="font-weight:bold">${randomPassword}</span> login with and then change your password</a></p>`;

            const mailResponce = await sendEmail({
                html: passwordLink,
                subject: 'Forgot Password',
                email: req.body.email
            });

            var responce: any = {
                email: req.body.email,
                emailResponce: mailResponce
            };

            let result = makeApiResponce('New Password has sent to your inbox', 1, StatusCodes.OK, responce);
            return res.json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, responce);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async verifyEmail(req: any, res: Response, next: NextFunction) {
        try {
            const link = '';
            if (!link) {
                let result = makeApiResponce('Invalid Link!', 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
