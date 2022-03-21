import mongoose from 'mongoose';
import IUser from '../../libraries/interfaces';
const { Schema } = mongoose;
const UserSchema = new Schema(
    {
        email: {
            type: String,
            require: false,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            minlength: 8,
            maxlength: 255,
            require: false
        },
        fName: {
            type: String,
            require: false
        },
        lName: {
            type: String,
            require: false
        },
        fullName: {
            type: String,
            required: false
        },
        mobile: {
            type: Number,
            require: false
        },
        gender: {
            type: String,
            require: false
        },
        dateOfBirth: {
            type: String,
            require: false
        },
        profilePic: {
            type: String
        },
        userType: {
            type: String,
            enum: ['superAdmin', 'agent', 'dataUser', 'agency', 'user', 'appUser'],
            require: false
        },
        parentAgency: {
            type: String,
            require: false
        },
        emailVerified: {
            type: Boolean,
            enum: ['true', 'false'],
            default: 'false'
        },
        mobileVerified: {
            type: Boolean,
            default: false,
            require: false
        },
        building: {
            type: String,
            require: false
        },
        state: {
            type: String,
            require: false
        },
        otp: {
            type: String
        },
        fcmToken: {
            type: String
        },
        locality: {
            type: String,
            require: false
        },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'country',
            require: false
        },
        emailNotification: {
            type: Boolean,
            default: false
        },
        pushNotification: {
            type: Boolean,
            default: false
        },
        textMessage: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: null
        },
        delBit: {
            type: Boolean,
            default: false
        },
        statusBit: {
            type: Boolean,
            default: false
        },
        socialType: {
            type: String,
            require: false
        },
        socialToken: {
            type: String,
            require: false
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'role',
            require: false
        }
    },
    { timestamps: true }
);

type NewType = IUser;

export default mongoose.model<NewType>('users', UserSchema);
