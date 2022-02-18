import PassportJWT from 'passport-jwt';
import passport from 'passport';
import UserModel from '../models/admin/user.model';
import { devConfig } from '../config/config';

export const configureJWTStartegy = () => {
    var opts: any = {};
    opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = devConfig.secret;

    var mobile: any = {};
    mobile.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    mobile.secretOrKey = devConfig.secondSecret;

    passport.use(
        'adminUser',
        new PassportJWT.Strategy(opts, function (payload, done) {
            UserModel.findById(payload.id, function (err: any, user: any) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }).select('-password');
        })
    );
    passport.use(
        'mobileUser',
        new PassportJWT.Strategy(mobile, function (payload, done) {
            UserModel.findById(payload.id, function (err: any, user: any) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }).select('-password');
        })
    );
};
passport.serializeUser(function (user: any, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err: any, user: boolean | Express.User | null | undefined) {
        done(err, user);
    });
});
