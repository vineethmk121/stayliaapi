import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import faqModel from '../../models/admin/FAQ.model';
import { makeApiResponce } from '../../libraries/responce';
import faqData from '../../libraries/interfaces';

export default {
    async addFaq(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateFaqSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const faq: faqData = new faqModel(req.body);
            faq.createdBy = req.user;
            await faq.save();
            var faqResponce: any = {
                _id: faq._id,
                title: faq.title,
                description: faq.description,
                createdBy: faq.createdBy
            };
            let result = makeApiResponce('FAQ Added Successfully', 1, StatusCodes.OK, faqResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewFaq(req: Request, res: Response, next: NextFunction) {
        try {
            const faq: faqData = await faqModel.findById(req.params.id).lean();
            if (!faq) {
                let result = makeApiResponce('Faq Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Faq Founds Successfully', 1, StatusCodes.OK, faq);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllFaqs(req: Request, res: Response, next: NextFunction) {
        try {
            var faq: faqData = await faqModel.find({ delBit: false }).lean();
            if (!faq) {
                let result = makeApiResponce('FAQs Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('FAQs Found Successfully', 1, StatusCodes.OK, faq);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateFaq(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var faq: faqData = await faqModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!faq) {
                let result = makeApiResponce('Fag Not Exists', 1, StatusCodes.BAD_REQUEST, faq);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Fag Updated Successfully', 1, StatusCodes.OK, faq);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteFaq(req: Request, res: Response, next: NextFunction) {
        try {
            var faq: faqData = await faqModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!faq) {
                let result = makeApiResponce('Faq Not Exists', 1, StatusCodes.BAD_REQUEST, faq);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Faq Deleted Successfully', 1, StatusCodes.OK, faq);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
