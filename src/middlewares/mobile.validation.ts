import Joi from 'joi';

export default {
    validateSignupSchema(body: any) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().optional(),
            fName: Joi.string().required(),
            lName: Joi.string().required(),
            mobile: Joi.string().required(),
            dateOfBirth: Joi.string().required(),
            userType: Joi.string().required(),
            profilePic: Joi.string().optional(),
            userRole: Joi.string().required(),
            building: Joi.string().required(),
            locality: Joi.string().required(),
            state: Joi.string().required(),
            gender: Joi.string().required(),
            parentAgency: Joi.string().required(),
            country: Joi.string().required(),
            updatedBy: Joi.string().optional()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateLoginSchema(body: any) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateMobileSignUpSchema(body: any) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            fullName: Joi.string().required(),
            mobile: Joi.string().required(),
            otp: Joi.string().optional()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateRolesSchema(body: any) {
        const schema = Joi.object().keys({
            name: Joi.string().email().required(),
            description: Joi.string().required(),
            rights: Joi.array().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateCountrySchema(body: any) {
        const schema = Joi.object().keys({
            countryName: Joi.string().required(),
            countryCode: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateAmenitySchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            amenitiesIcon: Joi.string()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateFurnishSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateBedRoomSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateOverViewSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            overViewIcon: Joi.string()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validatePropertyTypeSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            filter: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateTagSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateAddInfoSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validatePropertySchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            flatNumber: Joi.string().required(),
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.any().required(),
            countryCode: Joi.string().required(),
            sellingPrice: Joi.number().required(),
            discountPrice: Joi.number().required(),
            deposite: Joi.number().required(),
            rent: Joi.number().required(),
            additionalInfo: Joi.any().required(),
            propertyType: Joi.string().required(),
            overView: Joi.any().required(),
            amenities: Joi.any().required(),
            bedRoomTypes: Joi.any().required(),
            furnishingTypes: Joi.any().required(),
            tags: Joi.any().required(),
            gallaryImages: Joi.string().optional(),
            sliderImages: Joi.string().optional(),
            propertyPlan: Joi.string().optional(),
            agency: Joi.any().required(),
            agent: Joi.string().required(),
            propertySaleType: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateSpecialitiesSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            specialtyIcon: Joi.string()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateFaqSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateAgencySchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateSocialSignUpSchema(body: any) {
        const schema = Joi.object().keys({
            socialType: Joi.string().required(),
            socialToken: Joi.string().required(),
            email: Joi.string().email().optional()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    }
};
