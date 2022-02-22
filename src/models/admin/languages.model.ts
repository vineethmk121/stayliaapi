import mongoose from 'mongoose';
import languagesData from '../../libraries/interfaces';
/*********** roles model ************/
const { Schema } = mongoose;
const languagesSchema = new Schema(
    {
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'country',
            required: false
        },
        language: {
            type: String,
            required: true
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
export default mongoose.model<languagesData>('languages', languagesSchema);
