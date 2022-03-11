import mongoose from 'mongoose';
import priceRangeData from '../../libraries/interfaces';
/*********** price range model ************/
const { Schema } = mongoose;
const priceRangeSchema = new Schema(
    {
        minPriceRange: {
            type: Number,
            required: false
        },
        maxPriceRange: {
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
export default mongoose.model<priceRangeData>('priceRange', priceRangeSchema);
