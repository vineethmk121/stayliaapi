import mongoose from 'mongoose';
import propertyTypeData from '../../libraries/interfaces';
/*********** roles model ************/
const { Schema } = mongoose;
const propertyTypeSchema = new Schema(
    {
        title: {
            type: String,
            required: false
        },
        filter: {
            type: String,
            required: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: false
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: false
        },
        statusBit: {
            type: String,
            default: 'active'
        },
        delBit: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
export default mongoose.model<propertyTypeData>('propertyType', propertyTypeSchema);
