import mongoose from 'mongoose';
import bedRoomTypeData from '../../libraries/interfaces';
/*********** roles model ************/
const { Schema } = mongoose;
const bedRoomTypeSchema = new Schema(
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
export default mongoose.model<bedRoomTypeData>('bedRoomType', bedRoomTypeSchema);
