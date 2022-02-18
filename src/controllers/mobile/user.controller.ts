import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../../models/admin/user.model';
import { Twilio } from 'twilio';
import { devConfig } from '../../config/config';
import validation from '../../middlewares/user.validation';
import { getEncryptedPassword, randomValueHex, getMobileJWTToken } from '../../libraries/util';
import { makeApiResponce } from '../../libraries/responce';
export default {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            // VALIDATE THE REQUEST
            const { error, value } = validation.validateMobileSignUpSchema(req.body);
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
    }
};
