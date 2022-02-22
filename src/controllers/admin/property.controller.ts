import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import propertyModel from '../../models/admin/properties.model';
import { makeApiResponce } from '../../libraries/responce';
import propertyData from '../../libraries/interfaces';

export default {
    async addBedRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateBedRoomSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingBedRoomType: propertyData = await propertyModel.findOne({ title: req.body.title }).lean();
            if (existingBedRoomType) {
                let result = makeApiResponce('This BedRoomType is Already Exsit, Please try another BedRoomType!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const bedRoomType: propertyData = new propertyModel(req.body);
            bedRoomType.createdBy = req.user;
            await bedRoomType.save();
            var bedRoomResponce: any = {
                _id: bedRoomType._id,
                title: bedRoomType.title,
                createdBy: bedRoomType.createdBy
            };
            let result = makeApiResponce('BedRoomType Added Successfully', 1, StatusCodes.OK, bedRoomResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewBedRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const bedRoomType: propertyData = await propertyModel.findById(req.params.id).lean();
            if (!bedRoomType) {
                let result = makeApiResponce('BedRoomType Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('BedRoomType Founds Successfully', 1, StatusCodes.OK, bedRoomType);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllBedRoomTypes(req: Request, res: Response, next: NextFunction) {
        try {
            var bedRoomType: propertyData = await propertyModel.find({ delBit: false }).lean();
            if (!bedRoomType) {
                let result = makeApiResponce('BedRoomTypes Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('BedRoomTypes Found Successfully', 1, StatusCodes.OK, bedRoomType);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateBedRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var bedRoomType: propertyData = await propertyModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!bedRoomType) {
                let result = makeApiResponce('BedRoomType Not Exists', 1, StatusCodes.BAD_REQUEST, bedRoomType);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('BedRoomType Updated Successfully', 1, StatusCodes.OK, bedRoomType);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteBedRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            var bedRoomType: propertyData = await propertyModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!bedRoomType) {
                let result = makeApiResponce('BedRoomType Not Exists', 1, StatusCodes.BAD_REQUEST, bedRoomType);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('BedRoomType Deleted Successfully', 1, StatusCodes.OK, bedRoomType);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
