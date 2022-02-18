import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import furnishingModel from '../../models/admin/furnishingType.model';
import { makeApiResponce } from '../../libraries/responce';
import furnishingTypeData from '../../libraries/interfaces';

export default {
    async addFurnishType(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateFurnishSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingFurnish = await furnishingModel.findOne({ title: req.body.title }).lean();
            if (existingFurnish) {
                let result = makeApiResponce('This FurnishType is Already Exsit, Please try another FurnishType!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const furnish: furnishingTypeData = new furnishingModel(req.body);
            furnish.createdBy = req.user;
            await furnish.save();
            var furnishResponce: any = {
                _id: furnish._id,
                title: furnish.title,
                createdBy: furnish.createdBy
            };
            let result = makeApiResponce('FurnishType Added Successfully', 1, StatusCodes.OK, furnishResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewFurnishType(req: Request, res: Response, next: NextFunction) {
        try {
            const furnish: furnishingTypeData = await furnishingModel.findById(req.params.id).lean();
            if (!furnish) {
                let result = makeApiResponce('FurnishType Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('FurnishType Founds Successfully', 1, StatusCodes.OK, furnish);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllFurnishTypes(req: Request, res: Response, next: NextFunction) {
        try {
            var furnish: furnishingTypeData = await furnishingModel.find({ delBit: false }).lean();
            if (!furnish) {
                let result = makeApiResponce('FurnishTypes Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('FurnishTypes Found Successfully', 1, StatusCodes.OK, furnish);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateFurnishType(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var furnish: furnishingTypeData = await furnishingModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!furnish) {
                let result = makeApiResponce('FurnishType Not Exists', 1, StatusCodes.BAD_REQUEST, furnish);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('FurnishType Updated Successfully', 1, StatusCodes.OK, furnish);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteFurnishType(req: Request, res: Response, next: NextFunction) {
        try {
            var furnish: furnishingTypeData = await furnishingModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!furnish) {
                let result = makeApiResponce('FurnishType Not Exists', 1, StatusCodes.BAD_REQUEST, furnish);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('FurnishType Deleted Successfully', 1, StatusCodes.OK, furnish);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
