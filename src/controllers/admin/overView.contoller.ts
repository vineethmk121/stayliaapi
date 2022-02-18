import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import overViewModel from '../../models/admin/overViews.model';
import { makeApiResponce } from '../../libraries/responce';
import overViewData from '../../libraries/interfaces';

export default {
    async addOverView(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateOverViewSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingOverView = await overViewModel.findOne({ title: req.body.title }).lean();
            if (existingOverView) {
                let result = makeApiResponce('This OverView is Already Exsit, Please try another OverView!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const overView: overViewData = new overViewModel(req.body);
            overView.createdBy = req.user;
            await overView.save();
            var overViewResponce: any = {
                _id: overView._id,
                title: overView.title,
                icon: overView.icon,
                createdBy: overView.createdBy
            };
            let result = makeApiResponce('OverView Added Successfully', 1, StatusCodes.OK, overViewResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewOverView(req: Request, res: Response, next: NextFunction) {
        try {
            const overView: overViewData = await overViewModel.findById(req.params.id).lean();
            if (!overView) {
                let result = makeApiResponce('OverView Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('OverView Founds Successfully', 1, StatusCodes.OK, overView);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllOverViews(req: Request, res: Response, next: NextFunction) {
        try {
            var overView: overViewData = await overViewModel.find({ delBit: false }).lean();
            if (!overView) {
                let result = makeApiResponce('OverViews Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('OverViews Found Successfully', 1, StatusCodes.OK, overView);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateOverView(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var overView: overViewData = await overViewModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!overView) {
                let result = makeApiResponce('OverView Not Exists', 1, StatusCodes.BAD_REQUEST, overView);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('OverView Updated Successfully', 1, StatusCodes.OK, overView);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteOverView(req: Request, res: Response, next: NextFunction) {
        try {
            var overView: overViewData = await overViewModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!overView) {
                let result = makeApiResponce('OverView Not Exists', 1, StatusCodes.BAD_REQUEST, overView);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('OverView Deleted Successfully', 1, StatusCodes.OK, overView);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
