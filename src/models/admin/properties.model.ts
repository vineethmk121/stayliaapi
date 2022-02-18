import mongoose from 'mongoose';
import propertyData from '../../libraries/interfaces';
const { Schema } = mongoose;
const PropertySchema = new Schema(
    {
        title: {
            type: String,
            require: false
        },
        description: {
            type: String,
            minlength: 8,
            maxlength: 255
        },
        flatNumber: {
            type: String,
            require: false
        },
        street: {
            type: String,
            require: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            require: false
        },
        country: {
            type: String,
            require: false
        },
        countryCode: {
            type: String,
            require: false
        },
        sellingPrice: {
            type: [Number]
        },
        discountPrice: {
            type: [Number],
            require: false
        },
        deposite: {
            type: [Number],
            require: false
        },
        rent: {
            type: [Number]
        },
        additionalInfo: [
            {
                type: String,
                default: false,
                require: false
            }
        ],
        propertyType: [
            {
                type: String,
                require: false
            }
        ],
        overView: [
            {
                type: String,
                require: false
            }
        ],
        amenities: [
            {
                type: String
            }
        ],
        bedRoomTypes: [
            {
                type: String
            }
        ],
        furnishingTypes: [
            {
                type: String,
                require: false
            }
        ],
        tags: [
            {
                type: String,
                require: false
            }
        ],
        gallaryImages: [
            {
                type: String,
                default: false
            }
        ],
        sliderImages: [
            {
                type: String,
                default: false
            }
        ],
        propertyPlan: {
            type: String,
            default: false
        },
        agency: {
            type: String,
            default: false
        },
        agent: {
            type: String,
            default: false
        },
        isApproved: {
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
        }
    },
    { timestamps: true }
);

type NewType = propertyData;

export default mongoose.model<NewType>('properties', PropertySchema);
