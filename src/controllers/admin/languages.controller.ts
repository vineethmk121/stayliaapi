import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import languagesModel from '../../models/admin/languages.model';
import { makeApiResponce } from '../../libraries/responce';
import languagesData from '../../libraries/interfaces';

export default {
    async addLanguages(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validatelanguagesSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingCountry = await languagesModel.findOne({ country: req.body.country }).lean();
            if (existingCountry) {
                let result = makeApiResponce('This Country is Already Exsit, Please try another Country!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const languages: languagesData = new languagesModel(req.body);
            languages.createdBy = req.user;
            await languages.save();
            var languagesResponce: any = {
                _id: languages._id,
                country: languages.country,
                language: languages.language,
                createdBy: languages.createdBy
            };
            let result = makeApiResponce('coutry language Added Successfully', 1, StatusCodes.OK, languagesResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewLanguages(req: Request, res: Response, next: NextFunction) {
        try {
            const languages: languagesData = await languagesModel.findById(req.params.id).lean();
            if (!languages) {
                let result = makeApiResponce('User Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('User Founds Successfully', 1, StatusCodes.OK, languages);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllLanguages(req: Request, res: Response, next: NextFunction) {
        try {
            var languages: languagesData = await languagesModel.find({ delBit: false }).lean();
            if (!languages) {
                let result = makeApiResponce('Countries Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Countries Found Successfully', 1, StatusCodes.OK, languages);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateLanguages(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var languages: languagesData = await languagesModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!languages) {
                let result = makeApiResponce('languages Not Exists', 1, StatusCodes.BAD_REQUEST, languages);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('languages Updated Successfully', 1, StatusCodes.OK, languages);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteLanguages(req: Request, res: Response, next: NextFunction) {
        try {
            var languages: languagesData = await languagesModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!languages) {
                let result = makeApiResponce('languages Not Exists', 1, StatusCodes.BAD_REQUEST, languages);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('languages Deleted Successfully', 1, StatusCodes.OK, languages);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
