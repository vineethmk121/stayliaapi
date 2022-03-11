import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import furnishingStatusModel from '../../models/admin/furnishingStatus.model';
import { makeApiResponce } from '../../libraries/responce';
import furnishingStatusData from '../../libraries/interfaces';

export default {
    async addFurnishStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateFurnishingStatusSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingFurnish = await furnishingStatusModel.findOne({ title: req.body.title }).lean();
            if (existingFurnish) {
                let result = makeApiResponce('This Furnishing Status is Already Exsit, Please try another Furnish Status!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const furnish: furnishingStatusData = new furnishingStatusModel(req.body);
            furnish.createdBy = req.user;
            await furnish.save();
            var furnishResponce: any = {
                _id: furnish._id,
                title: furnish.title,
                createdBy: furnish.createdBy
            };
            let result = makeApiResponce('Furnishing Status Added Successfully', 1, StatusCodes.OK, furnishResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewFurnishStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const furnish: furnishingStatusData = await furnishingStatusModel.findById(req.params.id).lean();
            if (!furnish) {
                let result = makeApiResponce('Furnishing Status Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Furnishing Status Founds Successfully', 1, StatusCodes.OK, furnish);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllFurnishStatus(req: Request, res: Response, next: NextFunction) {
        try {
            var furnish: furnishingStatusData = await furnishingStatusModel.find({ delBit: false }).lean();
            if (!furnish) {
                let result = makeApiResponce('Furnishing Statuss Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Furnishing Statuss Found Successfully', 1, StatusCodes.OK, furnish);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateFurnishStatus(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var furnish: furnishingStatusData = await furnishingStatusModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!furnish) {
                let result = makeApiResponce('Furnishing Status Not Exists', 1, StatusCodes.BAD_REQUEST, furnish);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Furnishing Status Updated Successfully', 1, StatusCodes.OK, furnish);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteFurnishStatus(req: Request, res: Response, next: NextFunction) {
        try {
            var furnish: furnishingStatusData = await furnishingStatusModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!furnish) {
                let result = makeApiResponce('Furnishing Status Not Exists', 1, StatusCodes.BAD_REQUEST, furnish);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Furnishing Status Deleted Successfully', 1, StatusCodes.OK, furnish);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
