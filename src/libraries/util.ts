import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { devConfig } from '../config/config';

export const getJWTToken = async (payload?: any) => {
    const token = jwt.sign(payload, devConfig.secret, {
        expiresIn: '24h'
    });
    return token;
};
export const getEncryptedPassword = async (password: string) => {
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(password, salt);
    return hash;
};
export const randomValueHex = async (length?: any) => {
    // let randomstring = crypto
    //     .randomBytes(Math.ceil(len / 2))
    //     .toString('hex') // convert to hexadecimal format
    //     .slice(0, len)
    //     .toUpperCase(); // return required number of characters
    // return randomstring;

    let result = '';
    let characters = '0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
export const getMobileJWTToken = async (payload?: any) => {
    const token = jwt.sign(payload, devConfig.secondSecret, {
        expiresIn: '365d'
    });
    return token;
};
