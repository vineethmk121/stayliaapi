import rolesModel from '../models/admin/roles.model';
import { StatusCodes } from 'http-status-codes';
// import { Request, Response, NextFunction } from 'express';
import { makeApiResponce } from '../libraries/responce';

module.exports = async function setUserRolesMiddleware(req, res, next) {
    // console.log(req.route.path);
    // console.log(req.user);
    let result;
    let rightsArrayIndex;
    let subsBit = 0;
    let role: any = await rolesModel.findOne({ _id: req.user.roleId, rights: { $elemMatch: { url: req.route.path } }, delBit: false });
    // console.log(role);
    // return false;

    if (!role) {
        result = makeApiResponce('User not access this URL!', 0, StatusCodes.NOT_FOUND, []);
        return res.status(StatusCodes.NOT_FOUND).json(result);
    } else {
        console.log('else');
        for (let i = 0; i < role.rights.length; i++) {
            if (role.rights[i].url === req.route.path) {
                rightsArrayIndex = i;
            }
        }

        console.log(rightsArrayIndex);

        let arr = role.rights[rightsArrayIndex].subs;
        // console.log(arr);
        console.log(arr.length);

        if (arr.length != 0) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[j].label === req.headers.modulename) {
                    console.log('dasdasdasdas');
                    subsBit = 1;
                }
            }
        } else {
            subsBit = 1;
        }
        console.log(subsBit);
        // return false;
        if (subsBit === 1) {
            console.log('every things is ok');
            next();
        } else {
            result = makeApiResponce('User not access this URL!', 0, StatusCodes.NOT_FOUND, []);
            return res.status(StatusCodes.NOT_FOUND).json(result);
        }
    }

    // if (req.user) {
    //     next();
    // } else {
    //     // return unauthorized
    //     console.log('else');
    //     res.send(401, 'Unauthorized');
    // }
};
