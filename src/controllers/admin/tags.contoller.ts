import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import tagModel from '../../models/admin/tags.model';
import { makeApiResponce } from '../../libraries/responce';
import tagsData from '../../libraries/interfaces';

export default {
    async addTag(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateTagSchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingTag = await tagModel.findOne({ title: req.body.title }).lean();
            if (existingTag) {
                let result = makeApiResponce('This Tag is Already Exsit, Please try another Tag!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const tag: tagsData = new tagModel(req.body);
            tag.createdBy = req.user;
            await tag.save();
            var tagResponce: any = {
                _id: tag._id,
                title: tag.title,
                description: tag.description,
                createdBy: tag.createdBy
            };
            let result = makeApiResponce('Tag Added Successfully', 1, StatusCodes.OK, tagResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewTag(req: Request, res: Response, next: NextFunction) {
        try {
            const tag: tagsData = await tagModel.findById(req.params.id).lean();
            if (!tag) {
                let result = makeApiResponce('Tag Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Tag Founds Successfully', 1, StatusCodes.OK, tag);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllTags(req: Request, res: Response, next: NextFunction) {
        try {
            var tag: tagsData = await tagModel.find({ delBit: false }).lean();
            if (!tag) {
                let result = makeApiResponce('Tags Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Tags Found Successfully', 1, StatusCodes.OK, tag);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateTag(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var tag: tagsData = await tagModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!tag) {
                let result = makeApiResponce('Tag Not Exists', 1, StatusCodes.BAD_REQUEST, tag);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Tag Updated Successfully', 1, StatusCodes.OK, tag);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteTag(req: Request, res: Response, next: NextFunction) {
        try {
            var tag: tagsData = await tagModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!tag) {
                let result = makeApiResponce('Tag Not Exists', 1, StatusCodes.BAD_REQUEST, tag);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('Tag Deleted Successfully', 1, StatusCodes.OK, tag);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
