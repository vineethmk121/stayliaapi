import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { makeApiResponce } from '../../libraries/responce';
import rolesModel from '../../models/admin/roles.model';
import UserRoles from '../../libraries/interfaces';
export default {
    /*********** complete roles crud operations ************/
    async addRole(req: Request, res: Response, next: NextFunction) {
        try {
            const role: UserRoles = new rolesModel(req.body);
            role.createdBy = req.user;
            await role.save();
            let result = makeApiResponce('Role Added Successfully', 1, StatusCodes.OK, role);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async updateRole(req: Request, res: Response, next: NextFunction) {
        try {
            let role: any = await rolesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!role) {
                let result = makeApiResponce('Role Not Found!', 0, StatusCodes.NOT_FOUND, {});
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Role Update Successfully!', 1, StatusCodes.OK, role);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async deleteRole(req: Request, res: Response, next: NextFunction) {
        try {
            let role: any = await rolesModel.findByIdAndUpdate(req.params.id, { delBit: true }, { new: true });
            if (!role) {
                let result = makeApiResponce('Role Not Found!', 0, StatusCodes.NOT_FOUND, role);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Role Deleted Successfully!', 1, StatusCodes.OK, role);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async viewRole(req: Request, res: Response, next: NextFunction) {
        try {
            let role: any = await rolesModel.findOne({ _id: req.params.id, delBit: false });
            if (!role) {
                let result = makeApiResponce('Role Not Found!', 0, StatusCodes.NOT_FOUND, role);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Role View Successfully!', 1, StatusCodes.OK, role);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    },
    async getAllRoles(req: Request, res: Response, next: NextFunction) {
        try {
            let roles: any = await rolesModel.find({ delBit: false }).sort({ createdAt: -1 }).populate('createdBy', ['-password']).lean();
            if (!roles.length) {
                let result = makeApiResponce('Roles Not Found!', 0, StatusCodes.NOT_FOUND, roles);
                return res.status(StatusCodes.NOT_FOUND).json(result);
            }
            let result = makeApiResponce('Roles Got Successfully!', 1, StatusCodes.OK, roles);
            return res.status(StatusCodes.OK).json(result);
        } catch (err) {
            console.log(err);
            let result = makeApiResponce('INTERNAL_SERVER_ERROR', 0, StatusCodes.INTERNAL_SERVER_ERROR, {});
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
        }
    }
};
