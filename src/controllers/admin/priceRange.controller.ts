import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import priceRangeModel from '../../models/admin/priceRange.model';
import { makeApiResponce } from '../../libraries/responce';
import priceRangeData from '../../libraries/interfaces';

export default {
    async addpriceRange(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validatepriceRangeSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const priceRange: priceRangeData = new priceRangeModel(req.body);
            priceRange.createdBy = req.user;
            await priceRange.save();
            var priceRangeResponce: any = {
                _id: priceRange._id,
                minPriceRange: priceRange.minPriceRange,
                maxPriceRange: priceRange.maxPriceRange,
                createdBy: priceRange.createdBy
            };
            let result = makeApiResponce('Price Range Added Successfully', 1, StatusCodes.OK, priceRangeResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewpriceRange(req: Request, res: Response, next: NextFunction) {
        try {
            const priceRange: priceRangeData = await priceRangeModel.findById(req.params.id).lean();
            if (!priceRange) {
                let result = makeApiResponce('Price Range Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('PriceRange Founds Successfully', 1, StatusCodes.OK, priceRange);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllpriceRanges(req: Request, res: Response, next: NextFunction) {
        try {
            var priceRange: priceRangeData = await priceRangeModel.find({ delBit: false }).lean();
            if (!priceRange) {
                let result = makeApiResponce('Price Ranges Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Price Ranges Found Successfully', 1, StatusCodes.OK, priceRange);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updatepriceRange(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var priceRange: priceRangeData = await priceRangeModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!priceRange) {
                let result = makeApiResponce('Price Range Not Exists', 1, StatusCodes.BAD_REQUEST, priceRange);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('PriceRange Updated Successfully', 1, StatusCodes.OK, priceRange);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deletepriceRange(req: Request, res: Response, next: NextFunction) {
        try {
            var priceRange: priceRangeData = await priceRangeModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!priceRange) {
                let result = makeApiResponce('Price Range Not Exists', 1, StatusCodes.BAD_REQUEST, priceRange);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Price Range Deleted Successfully', 1, StatusCodes.OK, priceRange);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
