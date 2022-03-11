import mongoose from 'mongoose';
import furnishingStatusData from '../../libraries/interfaces';
/*********** roles model ************/
const { Schema } = mongoose;
const furnishingStatusSchema = new Schema(
    {
        title: {
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
export default mongoose.model<furnishingStatusData>('furnishingStatus', furnishingStatusSchema);
