import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import contructionStatusModel from '../../models/admin/contruction.model';
import { makeApiResponce } from '../../libraries/responce';
import constructionStatusData from '../../libraries/interfaces';

export default {
    async addContructionStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateContructionStatusSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingContruction = await contructionStatusModel.findOne({ title: req.body.title }).lean();
            if (existingContruction) {
                let result = makeApiResponce('This Contruction Status is Already Exsit, Please try another Contruction Status!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const contructionStatus: constructionStatusData = new contructionStatusModel(req.body);
            contructionStatus.createdBy = req.user;
            await contructionStatus.save();
            var contructionStatusResponce: any = {
                _id: contructionStatus._id,
                title: contructionStatus.title,
                createdBy: contructionStatus.createdBy
            };
            let result = makeApiResponce('Land Status Added Successfully', 1, StatusCodes.OK, contructionStatusResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewContructionStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const contruction: constructionStatusData = await contructionStatusModel.findById(req.params.id).lean();
            if (!contruction) {
                let result = makeApiResponce('Contruction Status Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Contruction Status Founds Successfully', 1, StatusCodes.OK, contruction);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllContructionStatus(req: Request, res: Response, next: NextFunction) {
        try {
            var contruction: constructionStatusData = await contructionStatusModel.find({ delBit: false }).lean();
            if (!contruction) {
                let result = makeApiResponce('Contruction Status Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Contruction Status Found Successfully', 1, StatusCodes.OK, contruction);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateContructionStatus(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var contruction: constructionStatusData = await contructionStatusModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!contruction) {
                let result = makeApiResponce('Contruction Status Not Exists', 1, StatusCodes.BAD_REQUEST, contruction);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Contruction Status Updated Successfully', 1, StatusCodes.OK, contruction);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteContructionStatus(req: Request, res: Response, next: NextFunction) {
        try {
            var contruction: constructionStatusData = await contructionStatusModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!contruction) {
                let result = makeApiResponce('Contruction Status Not Exists', 1, StatusCodes.BAD_REQUEST, contruction);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Contruction Status Deleted Successfully', 1, StatusCodes.OK, contruction);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
