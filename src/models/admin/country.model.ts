import mongoose from 'mongoose';
import countryData from '../../libraries/interfaces';
/*********** roles model ************/
const { Schema } = mongoose;
const countrySchema = new Schema(
    {
        countryName: {
            type: String,
            required: true
        },
        countryCode: {
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
export default mongoose.model<countryData>('country', countrySchema);
