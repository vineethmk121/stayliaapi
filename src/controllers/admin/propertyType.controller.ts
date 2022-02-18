import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import propertyTypeModel from '../../models/admin/propertyType.model';
import { makeApiResponce } from '../../libraries/responce';
import propertyTypeData from '../../libraries/interfaces';

export default {
    async addPropertyType(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validatePropertyTypeSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingPropertyType = await propertyTypeModel.findOne({ title: req.body.title }).lean();
            if (existingPropertyType) {
                let result = makeApiResponce('This PropertyType is Already Exsit, Please try another PropertyType!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const propertyType: propertyTypeData = new propertyTypeModel(req.body);
            propertyType.createdBy = req.user;
            await propertyType.save();
            var propertyTypeResponce: any = {
                _id: propertyType._id,
                title: propertyType.title,
                filter: propertyType.filter,
                createdBy: propertyType.createdBy
            };
            let result = makeApiResponce('PropertyType Added Successfully', 1, StatusCodes.OK, propertyTypeResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewPropertyType(req: Request, res: Response, next: NextFunction) {
        try {
            const propertyType: propertyTypeData = await propertyTypeModel.findById(req.params.id).lean();
            if (!propertyType) {
                let result = makeApiResponce('PropertyType Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('PropertyType Founds Successfully', 1, StatusCodes.OK, propertyType);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllPropertyTypes(req: Request, res: Response, next: NextFunction) {
        try {
            var propertyType: propertyTypeData = await propertyTypeModel.find({ delBit: false }).lean();
            if (!propertyType) {
                let result = makeApiResponce('PropertyTypes Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('PropertyTypes Found Successfully', 1, StatusCodes.OK, propertyType);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updatePropertyType(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var propertyType: propertyTypeData = await propertyTypeModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!propertyType) {
                let result = makeApiResponce('PropertyType Not Exists', 1, StatusCodes.BAD_REQUEST, propertyType);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('PropertyType Updated Successfully', 1, StatusCodes.OK, propertyType);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deletePropertyType(req: Request, res: Response, next: NextFunction) {
        try {
            var propertyType: propertyTypeData = await propertyTypeModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!propertyType) {
                let result = makeApiResponce('PropertyType Not Exists', 1, StatusCodes.BAD_REQUEST, propertyType);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('PropertyType Deleted Successfully', 1, StatusCodes.OK, propertyType);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
