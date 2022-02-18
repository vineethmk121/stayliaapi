import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import termsAndConditionModel from '../../models/admin/terms&Condition.model';
import { makeApiResponce } from '../../libraries/responce';
import termsAndConditionData from '../../libraries/interfaces';

export default {
    async addTermsAndCondition(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateTermsAndConditionSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingtermsAndCondition = await termsAndConditionModel.findOne({ title: req.body.title }).lean();
            if (existingtermsAndCondition) {
                let result = makeApiResponce('This termsAndCondition is Already Exsit, Please try another termsAndCondition!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const termsAndCondition: termsAndConditionData = new termsAndConditionModel(req.body);
            termsAndCondition.createdBy = req.user;
            await termsAndCondition.save();
            var termsAndConditionResponce: any = {
                _id: termsAndCondition._id,
                title: termsAndCondition.title,
                description: termsAndCondition.description,
                createdBy: termsAndCondition.createdBy
            };
            let result = makeApiResponce('termsAndCondition Added Successfully', 1, StatusCodes.OK, termsAndConditionResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewTermsAndCondition(req: Request, res: Response, next: NextFunction) {
        try {
            const termsAndCondition: termsAndConditionData = await termsAndConditionModel.findById(req.params.id).lean();
            if (!termsAndCondition) {
                let result = makeApiResponce('termsAndCondition Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('termsAndCondition Founds Successfully', 1, StatusCodes.OK, termsAndCondition);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllTermsAndConditions(req: Request, res: Response, next: NextFunction) {
        try {
            var termsAndCondition: termsAndConditionData = await termsAndConditionModel.find({ delBit: false }).lean();
            if (!termsAndCondition) {
                let result = makeApiResponce('termsAndConditions Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('termsAndConditions Found Successfully', 1, StatusCodes.OK, termsAndCondition);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateTermsAndCondition(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var termsAndCondition: termsAndConditionData = await termsAndConditionModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!termsAndCondition) {
                let result = makeApiResponce('termsAndCondition Not Exists', 1, StatusCodes.BAD_REQUEST, termsAndCondition);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('termsAndCondition Updated Successfully', 1, StatusCodes.OK, termsAndCondition);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteTermsAndCondition(req: Request, res: Response, next: NextFunction) {
        try {
            var termsAndCondition: termsAndConditionData = await termsAndConditionModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!termsAndCondition) {
                let result = makeApiResponce('termsAndCondition Not Exists', 1, StatusCodes.BAD_REQUEST, termsAndCondition);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('termsAndCondition Deleted Successfully', 1, StatusCodes.OK, termsAndCondition);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
