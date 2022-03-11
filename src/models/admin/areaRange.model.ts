import mongoose from 'mongoose';
import areaRangeData from '../../libraries/interfaces';
/*********** area range model ************/
const { Schema } = mongoose;
const areaRangeSchema = new Schema(
    {
        minAreaRange: {
            type: Number,
            required: false
        },
        maxAreaRange: {
            type: Number,
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
export default mongoose.model<areaRangeData>('areaRange', areaRangeSchema);
