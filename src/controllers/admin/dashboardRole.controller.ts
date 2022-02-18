import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import validation from '../../middlewares/user.validation';
import rolesModel from '../../models/admin/roles.model';
import rightsModel from '../../models/admin/rights.model';
import { getEncryptedPassword } from '../../libraries/util';
import { makeApiResponce } from '../../libraries/responce';
import IUser from '../../libraries/interfaces';

export default {
    async addRole(req: Request, res: Response, next: NextFunction) {
        const right = new rightsModel(req.body);
        right.save();
        console.log(right);
        return false;
    }
};
