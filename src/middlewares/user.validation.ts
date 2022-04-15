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
            description: Joi.string().optional(),
            flatNumber: Joi.string().optional(),
            street: Joi.string().optional(),
            city: Joi.string().optional(),
            state: Joi.string().optional(),
            country: Joi.any().required(),
            countryCode: Joi.string().optional(),
            sellingPrice: Joi.number().optional(),
            discountPrice: Joi.number().optional(),
            deposite: Joi.number().optional(),
            rent: Joi.number().optional(),
            totalBedRooms: Joi.number().optional(),
            totalBatRooms: Joi.number().optional(),
            totalRoomCounts: Joi.number().optional(),
            propertyCode: Joi.string().optional(),
            licenseNumber: Joi.string().optional(),
            permit: Joi.string().optional(),
            propertyAge: Joi.string().optional(),
            areaId: Joi.string().optional(),
            areaSqrFt: Joi.string().optional(),
            setAsFeature: Joi.string().optional(),
            listedDate: Joi.string().optional(),
            neighbourHood: Joi.string().optional(),
            additionalInfo: Joi.any().required(),
            propertyType: Joi.any().required(),
            overView: Joi.any().required(),
            amenities: Joi.any().required(),
            bedRoomTypes: Joi.any().required(),
            furnishingTypes: Joi.any().required(),
            tags: Joi.any().required(),
            gallaryImages: Joi.string().optional(),
            sliderImages: Joi.string().optional(),
            propertyPlan: Joi.string().optional(),
            agency: Joi.any().required(),
            agent: Joi.any().required(),
            contructonId: Joi.string().optional(),
            landStatusId: Joi.string().optional(),
            furnishingStatusId: Joi.string().optional(),
            propertySaleType: Joi.string().optional(),
            address: Joi.string().optional(),
            location: Joi.string().optional(),
            lat: Joi.string().optional(),
            lng: Joi.string().optional(),
            createdBy: Joi.any().required()
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
    validatepriceRangeSchema(body: any) {
        const schema = Joi.object().keys({
            minPriceRange: Joi.number().required(),
            maxPriceRange: Joi.number().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateAreaRangeSchema(body: any) {
        const schema = Joi.object().keys({
            minAreaRange: Joi.number().required(),
            maxAreaRange: Joi.number().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateFurnishingStatusSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateLandStatusSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateContructionStatusSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
    validateNationalitiesSchema(body: any) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            state: Joi.string().required(),
            updatedBy: Joi.string().optional()
        });
        const { error, value } = schema.validate(body);
        if (error && error.details) {
            return { error };
        }
        return { value };
    }
};
