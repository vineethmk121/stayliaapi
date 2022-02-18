import mongoose from 'mongoose';
import amenitiesData from '../../libraries/interfaces';
/*********** roles model ************/
const { Schema } = mongoose;
const amenitiesSchema = new Schema(
    {
        title: {
            type: String,
            required: false
        },
        icon: {
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
export default mongoose.model<amenitiesData>('amenities', amenitiesSchema);
