import rolesModel from '../models/admin/roles.model';
import { StatusCodes } from 'http-status-codes';
// import { Request, Response, NextFunction } from 'express';
import { makeApiResponce } from '../libraries/responce';

module.exports = async function setUserRolesMiddleware(req, res, next) {
    console.log(req.route.path);
    console.log(req.user);
    let role: any = await rolesModel.findOne({ _id: req.user.roleId, delBit: false });
    if (!role) {
        let result = makeApiResponce('Role Not Found!', 0, StatusCodes.NOT_FOUND, role);
        return res.status(StatusCodes.NOT_FOUND).json(result);
    } else {
        let result = makeApiResponce('Role Not Found!', 0, StatusCodes.NOT_FOUND, role);
        return res.status(StatusCodes.NOT_FOUND).json(result);
    }

    next();
    // if (req.user) {
    //     next();
    // } else {
    //     // return unauthorized
    //     console.log('else');
    //     res.send(401, 'Unauthorized');
    // }
};
