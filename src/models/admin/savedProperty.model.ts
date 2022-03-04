import mongoose from 'mongoose';
import savePropertyData from '../../libraries/interfaces';
/*********** saved videos model ************/
const { Schema } = mongoose;
const savePropertySchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'properties',
            required: true
        },
        delBit: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
export default mongoose.model<savePropertyData>('saveProperty', savePropertySchema);
