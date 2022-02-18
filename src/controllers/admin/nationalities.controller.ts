import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import nationalitiesModel from '../../models/admin/nationalities.model';
import { makeApiResponce } from '../../libraries/responce';
import nationalitiesData from '../../libraries/interfaces';

export default {
    async addNationalities(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateNationalitiesSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingNationality = await nationalitiesModel.findOne({ title: req.body.title }).lean();
            if (existingNationality) {
                let result = makeApiResponce('This Nationality is Already Exsit, Please try another Nationality!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const nationality: nationalitiesData = new nationalitiesModel(req.body);
            nationality.createdBy = req.user;
            await nationality.save();
            var nationalityResponce: any = {
                _id: nationality._id,
                title: nationality.title,
                createdBy: nationality.createdBy
            };
            let result = makeApiResponce('Nationalities Added Successfully', 1, StatusCodes.OK, nationalityResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewNationalities(req: Request, res: Response, next: NextFunction) {
        try {
            const Nationality: nationalitiesData = await nationalitiesModel.findById(req.params.id).lean();
            if (!Nationality) {
                let result = makeApiResponce('Nationalities Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Nationalities Founds Successfully', 1, StatusCodes.OK, Nationality);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllNationalities(req: Request, res: Response, next: NextFunction) {
        try {
            var Nationality: nationalitiesData = await nationalitiesModel.find({ delBit: false }).lean();
            if (!Nationality) {
                let result = makeApiResponce('Nationalities Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Nationalities Found Successfully', 1, StatusCodes.OK, Nationality);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateNationalities(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var Nationality: nationalitiesData = await nationalitiesModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!Nationality) {
                let result = makeApiResponce('Nationalities Not Exists', 1, StatusCodes.BAD_REQUEST, Nationality);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Nationalities Updated Successfully', 1, StatusCodes.OK, Nationality);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteNationalities(req: Request, res: Response, next: NextFunction) {
        try {
            var Nationality: nationalitiesData = await nationalitiesModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!Nationality) {
                let result = makeApiResponce('Nationalities Not Exists', 1, StatusCodes.BAD_REQUEST, Nationality);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Nationalities Deleted Successfully', 1, StatusCodes.OK, Nationality);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
