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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'country',
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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'additionalInfo',
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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'overView',
                require: false
            }
        ],
        amenities: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'amenities',
                default: null
            }
        ],
        bedRoomTypes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'bedRoomType',
                default: null
            }
        ],
        furnishingTypes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'furnishingType',
                default: null,
                require: false
            }
        ],
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'tags',
                default: null,
                require: false
            }
        ],
        gallaryImages: [
            {
                type: String,
                default: null
            }
        ],
        sliderImages: [
            {
                type: String,
                default: null
            }
        ],
        propertyPlan: [
            {
                type: String,
                default: null
            }
        ],
        agency: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'agency',
            default: null
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
