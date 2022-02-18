import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import session from 'express-session';
import { configureJWTStartegy } from './passport-jwt';
import { devConfig } from '../config/config';

export const setGlobalmiddleware = (app: any) => {
    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    dotenv.config({ path: '.env' });

    app.set('env', process.env.NODE_ENV);
    app.set('port', process.env.PORT || 1122);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(logger('dev'));
    app.use(
        session({
            secret: devConfig.secret,
            resave: true,
            saveUninitialized: true
        })
    );
    app.use(
        session({
            secret: devConfig.secondSecret,
            resave: true,
            saveUninitialized: true
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    require('./passport-jwt');
    configureJWTStartegy();
};
