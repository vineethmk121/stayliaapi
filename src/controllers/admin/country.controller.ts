import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import countryModel from '../../models/admin/country.model';
import { makeApiResponce } from '../../libraries/responce';
import countryData from '../../libraries/interfaces';

export default {
    async addCountry(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateCountrySchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingCountry = await countryModel.findOne({ countryName: req.body.countryName }).lean();
            if (existingCountry) {
                let result = makeApiResponce('This Country is Already Exsit, Please try another Country!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const country: countryData = new countryModel(req.body);
            country.createdBy = req.user; // get current User data
            await country.save();
            var countryResponce: any = {
                _id: country._id,
                countryName: country.countryName,
                countryCode: country.countryCode,
                createdBy: country.createdBy
            };
            let result = makeApiResponce('Country Added Successfully', 1, StatusCodes.OK, countryResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewCountry(req: Request, res: Response, next: NextFunction) {
        try {
            const country: countryData = await countryModel.findById(req.params.id).lean();
            if (!country) {
                let result = makeApiResponce('User Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('User Founds Successfully', 1, StatusCodes.OK, country);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllCountries(req: Request, res: Response, next: NextFunction) {
        try {
            var country: countryData = await countryModel.find({ delBit: false }).lean();
            if (!country) {
                let result = makeApiResponce('Countries Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Countries Found Successfully', 1, StatusCodes.OK, country);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateCountry(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var country: countryData = await countryModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!country) {
                let result = makeApiResponce('Country Not Exists', 1, StatusCodes.BAD_REQUEST, country);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Country Updated Successfully', 1, StatusCodes.OK, country);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteCountry(req: Request, res: Response, next: NextFunction) {
        try {
            var country: countryData = await countryModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!country) {
                let result = makeApiResponce('Country Not Exists', 1, StatusCodes.BAD_REQUEST, country);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Country Deleted Successfully', 1, StatusCodes.OK, country);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
