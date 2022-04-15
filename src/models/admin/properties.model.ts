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
            require: false
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
            type: Number
        },
        discountPrice: {
            type: Number,
            require: false
        },
        deposite: {
            type: Number,
            require: false
        },
        rent: {
            type: Number
        },
        totalBedRooms: {
            type: Number
        },
        totalBatRooms: {
            type: Number
        },
        totalRoomCounts: {
            type: Number
        },
        propertyCode: {
            type: String,
            required: false
        },
        licenseNumber: {
            type: String,
            required: false
        },
        permit: {
            type: String,
            required: false
        },
        propertyAge: {
            type: String,
            required: false
        },
        areaId: {
            type: String,
            required: false
        },
        areaSqrFt: {
            type: String,
            required: false
        },
        setAsFeature: {
            type: String,
            required: false
        },
        listedDate: {
            type: String,
            required: false
        },
        neighbourHood: {
            type: String,
            required: false
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: false
        },
        contructonId: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'contructionStatus',
            type: String,
            default: false
        },
        landStatusId: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'landStatus',
            type: String,
            default: false
        },
        furnishingStatusId: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'furnishingStatus',
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
        propertySaleType: {
            type: String,
            // enum: ['Buy', 'Rent', 'Personal'],
            default: 'Personal'
        },
        address: {
            type: String,
            require: false
        },
        location: {
            type: {
                type: String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            }
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

PropertySchema.index({ location: '2dsphere' });

type NewType = propertyData;

export default mongoose.model<NewType>('properties', PropertySchema);
