import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import additionalInfoModel from '../../models/admin/additionalInfo.model';
import { makeApiResponce } from '../../libraries/responce';
import additionalInfoData from '../../libraries/interfaces';

export default {
    async addInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateAddInfoSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingAddInfo = await additionalInfoModel.findOne({ title: req.body.title }).lean();
            if (existingAddInfo) {
                let result = makeApiResponce('This additionalInfo is Already Exsit, Please try another additionalInfo!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const additionalInfo: additionalInfoData = new additionalInfoModel(req.body);
            additionalInfo.createdBy = req.user;
            await additionalInfo.save();
            var addResponce: any = {
                _id: additionalInfo._id,
                title: additionalInfo.title,
                description: additionalInfo.description,
                createdBy: additionalInfo.createdBy
            };
            let result = makeApiResponce('additionalInfo Added Successfully', 1, StatusCodes.OK, addResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewAddInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const additionalInfo: additionalInfoData = await additionalInfoModel.findById(req.params.id).lean();
            if (!additionalInfo) {
                let result = makeApiResponce('additionalInfo Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('additionalInfo Founds Successfully', 1, StatusCodes.OK, additionalInfo);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllAddInfo(req: Request, res: Response, next: NextFunction) {
        try {
            var additionalInfo: additionalInfoData = await additionalInfoModel.find({ delBit: false }).lean();
            if (!additionalInfo) {
                let result = makeApiResponce('additionalInfo Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('additionalInfo Found Successfully', 1, StatusCodes.OK, additionalInfo);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateAddInfo(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var additionalInfo: additionalInfoData = await additionalInfoModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!additionalInfo) {
                let result = makeApiResponce('additionalInfo Not Exists', 1, StatusCodes.BAD_REQUEST, additionalInfo);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('additionalInfo Updated Successfully', 1, StatusCodes.OK, additionalInfo);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteAddInfo(req: Request, res: Response, next: NextFunction) {
        try {
            var additionalInfo: additionalInfoData = await additionalInfoModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!additionalInfo) {
                let result = makeApiResponce('additionalInfo Not Exists', 1, StatusCodes.BAD_REQUEST, additionalInfo);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('additionalInfo Deleted Successfully', 1, StatusCodes.OK, additionalInfo);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
