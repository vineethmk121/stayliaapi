import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import landStatusModel from '../../models/admin/lanStatus.model';
import { makeApiResponce } from '../../libraries/responce';
import landStatusData from '../../libraries/interfaces';

export default {
    async addLandStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateLandStatusSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingLand = await landStatusModel.findOne({ title: req.body.title }).lean();
            if (existingLand) {
                let result = makeApiResponce('This Land Status is Already Exsit, Please try another Furnish Status!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const landStatus: landStatusData = new landStatusModel(req.body);
            landStatus.createdBy = req.user;
            await landStatus.save();
            var landStatusResponce: any = {
                _id: landStatus._id,
                title: landStatus.title,
                createdBy: landStatus.createdBy
            };
            let result = makeApiResponce('Land Status Added Successfully', 1, StatusCodes.OK, landStatusResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewLandStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const land: landStatusData = await landStatusModel.findById(req.params.id).lean();
            if (!land) {
                let result = makeApiResponce('Land Status Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Land Status Founds Successfully', 1, StatusCodes.OK, land);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllLandStatus(req: Request, res: Response, next: NextFunction) {
        try {
            var land: landStatusData = await landStatusModel.find({ delBit: false }).lean();
            if (!land) {
                let result = makeApiResponce('land Status Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('land Status Found Successfully', 1, StatusCodes.OK, land);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateLandStatus(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var land: landStatusData = await landStatusModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!land) {
                let result = makeApiResponce('Land Status Not Exists', 1, StatusCodes.BAD_REQUEST, land);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Land Status Updated Successfully', 1, StatusCodes.OK, land);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteLandStatus(req: Request, res: Response, next: NextFunction) {
        try {
            var land: landStatusData = await landStatusModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!land) {
                let result = makeApiResponce('Land Status Not Exists', 1, StatusCodes.BAD_REQUEST, land);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Land Status Deleted Successfully', 1, StatusCodes.OK, land);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
