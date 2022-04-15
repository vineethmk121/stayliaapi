import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import specialitiesModel from '../../models/admin/specialities.model';
import { makeApiResponce } from '../../libraries/responce';
import specialitiesData from '../../libraries/interfaces';
import { devConfig } from '../../config/config';

export default {
    async addSpecialities(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateSpecialitiesSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingspecialities = await specialitiesModel.findOne({ title: req.body.title }).lean();
            if (existingspecialities) {
                let result = makeApiResponce('This specialities is Already Exsit, Please try another specialities!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const specialities: specialitiesData = new specialitiesModel(req.body);
            specialities.createdBy = req.user;
            if (req.file) {
                specialities.specialtyIcon = `${devConfig.getImagesPath.specialtyIcon}/` + req.file.filename;
            }
            await specialities.save();
            var specialitiesResponce: any = {
                _id: specialities._id,
                title: specialities.title,
                specialtyIcon: specialities.specialtyIcon,
                createdBy: specialities.createdBy
            };
            let result = makeApiResponce('specialities Added Successfully', 1, StatusCodes.OK, specialitiesResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewSpecialities(req: Request, res: Response, next: NextFunction) {
        try {
            const specialities: specialitiesData = await specialitiesModel.findById(req.params.id).lean();
            if (!specialities) {
                let result = makeApiResponce('specialities Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('specialities Founds Successfully', 1, StatusCodes.OK, specialities);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllSpecialities(req: Request, res: Response, next: NextFunction) {
        try {
            var specialities: specialitiesData = await specialitiesModel.find({ delBit: false }).lean();
            if (!specialities) {
                let result = makeApiResponce('Specialities Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Specialities Found Successfully', 1, StatusCodes.OK, specialities);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateSpecialities(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            if (req.file) {
                req.body.specialtyIcon = `${devConfig.getImagesPath.specialtyIcon}/` + req.file.filename;
            }
            var specialities: specialitiesData = await specialitiesModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!specialities) {
                let result = makeApiResponce('specialities Not Exists', 1, StatusCodes.BAD_REQUEST, specialities);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('specialities Updated Successfully', 1, StatusCodes.OK, specialities);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteSpecialities(req: Request, res: Response, next: NextFunction) {
        try {
            var specialities: specialitiesData = await specialitiesModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!specialities) {
                let result = makeApiResponce('specialities Not Exists', 1, StatusCodes.BAD_REQUEST, specialities);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('specialities Deleted Successfully', 1, StatusCodes.OK, specialities);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
