import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import areaRangeModel from '../../models/admin/areaRange.model';
import { makeApiResponce } from '../../libraries/responce';
import areaRangeData from '../../libraries/interfaces';

export default {
    async addAreaRange(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateAreaRangeSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const areaRange: areaRangeData = new areaRangeModel(req.body);
            areaRange.createdBy = req.user;
            await areaRange.save();
            var areaRangeResponce: any = {
                _id: areaRange._id,
                minAreaRange: areaRange.minAreaRange,
                maxAreaRange: areaRange.maxAreaRange,
                createdBy: areaRange.createdBy
            };
            let result = makeApiResponce('Area Range Added Successfully', 1, StatusCodes.OK, areaRangeResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewAreaRange(req: Request, res: Response, next: NextFunction) {
        try {
            const areaRange: areaRangeData = await areaRangeModel.findById(req.params.id).lean();
            if (!areaRange) {
                let result = makeApiResponce('Area Range Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Area Range Founds Successfully', 1, StatusCodes.OK, areaRange);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllAreaRanges(req: Request, res: Response, next: NextFunction) {
        try {
            var areaRange: areaRangeData = await areaRangeModel.find({ delBit: false }).lean();
            if (!areaRange) {
                let result = makeApiResponce('Area Ranges Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Area Ranges Found Successfully', 1, StatusCodes.OK, areaRange);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateAreaRange(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var areaRange: areaRangeData = await areaRangeModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!areaRange) {
                let result = makeApiResponce('Area Range Not Exists', 1, StatusCodes.BAD_REQUEST, areaRange);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Area Range Updated Successfully', 1, StatusCodes.OK, areaRange);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteAreaRange(req: Request, res: Response, next: NextFunction) {
        try {
            var areaRange: areaRangeData = await areaRangeModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!areaRange) {
                let result = makeApiResponce('Area Range Not Exists', 1, StatusCodes.BAD_REQUEST, areaRange);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Area Range Deleted Successfully', 1, StatusCodes.OK, areaRange);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
