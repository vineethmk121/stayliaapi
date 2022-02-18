import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import agencyModel from '../../models/admin/agency.model';
import { makeApiResponce } from '../../libraries/responce';
import agencyData from '../../libraries/interfaces';

export default {
    async addagency(req: Request, res: Response, next: NextFunction) {
        try {
            const { error, value } = validation.validateAgencySchema(req.body);
            if (error && error.details) {
                let result = makeApiResponce(error.message, 0, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const existingAgency = await agencyModel.findOne({ title: req.body.title }).lean();
            if (existingAgency) {
                let result = makeApiResponce('This agency is Already Exsit, Please try another agency!', 1, StatusCodes.BAD_REQUEST, {});
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            const agency: agencyData = new agencyModel(req.body);
            agency.createdBy = req.user;
            await agency.save();
            var bedRoomResponce: any = {
                _id: agency._id,
                title: agency.title,
                createdBy: agency.createdBy
            };
            let result = makeApiResponce('agency Added Successfully', 1, StatusCodes.OK, bedRoomResponce);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewagency(req: Request, res: Response, next: NextFunction) {
        try {
            const agency: agencyData = await agencyModel.findById(req.params.id).lean();
            if (!agency) {
                let result = makeApiResponce('agency Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('agency Founds Successfully', 1, StatusCodes.OK, agency);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllagencys(req: Request, res: Response, next: NextFunction) {
        try {
            var agency: agencyData = await agencyModel.find({ delBit: false }).lean();
            if (!agency) {
                let result = makeApiResponce('agencys Not Found', 1, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('agencys Found Successfully', 1, StatusCodes.OK, agency);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateagency(req: Request, res: Response, next: NextFunction) {
        try {
            req.body.updatedBy = req.user;
            var agency: agencyData = await agencyModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password').lean();
            if (!agency) {
                let result = makeApiResponce('agency Not Exists', 1, StatusCodes.BAD_REQUEST, agency);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('agency Updated Successfully', 1, StatusCodes.OK, agency);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteagency(req: Request, res: Response, next: NextFunction) {
        try {
            var agency: agencyData = await agencyModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true }).select('-password').lean();
            if (!agency) {
                let result = makeApiResponce('agency Not Exists', 1, StatusCodes.BAD_REQUEST, agency);
                return res.status(StatusCodes.BAD_REQUEST).json(result);
            }
            let result = makeApiResponce('agency Deleted Successfully', 1, StatusCodes.OK, agency);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
