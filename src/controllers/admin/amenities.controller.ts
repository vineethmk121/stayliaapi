import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import amenitiesModel from '../../models/admin/amenities.model';
import { makeApiResponce } from '../../libraries/responce';
import amenitiesData from '../../libraries/interfaces';

export default {
    async addAmenity(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateAmenitySchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingAmenity = await amenitiesModel.findOne({ title: req.body.title }).lean();
            if (existingAmenity) {
                let result = makeApiResponce('This Amenity is Already Exsit, Please try another Amenity!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const amenity: amenitiesData = new amenitiesModel(req.body);
            amenity.createdBy = req.user;
            await amenity.save();
            var amenityResponce: any = {
                _id: amenity._id,
                title: amenity.title,
                icon: amenity.icon,
                createdBy: amenity.createdBy
            };
            let result = makeApiResponce('Amenity Added Successfully', 1, StatusCodes.OK, amenityResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewAmenity(req: Request, res: Response, next: NextFunction) {
        try {
            const amenity: amenitiesData = await amenitiesModel.findById(req.params.id).lean();
            if (!amenity) {
                let result = makeApiResponce('Amenity Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Amenity Founds Successfully', 1, StatusCodes.OK, amenity);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllAmenities(req: Request, res: Response, next: NextFunction) {
        try {
            var amenity: amenitiesData = await amenitiesModel.find({ delBit: false }).lean();
            if (!amenity) {
                let result = makeApiResponce('Amenities Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Amenities Found Successfully', 1, StatusCodes.OK, amenity);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateAmenity(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var amenity: amenitiesData = await amenitiesModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!amenity) {
                let result = makeApiResponce('Amenity Not Exists', 1, StatusCodes.BAD_REQUEST, amenity);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Amenity Updated Successfully', 1, StatusCodes.OK, amenity);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteAmenity(req: Request, res: Response, next: NextFunction) {
        try {
            var amenity: amenitiesData = await amenitiesModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!amenity) {
                let result = makeApiResponce('Amenity Not Exists', 1, StatusCodes.BAD_REQUEST, amenity);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Amenity Deleted Successfully', 1, StatusCodes.OK, amenity);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
