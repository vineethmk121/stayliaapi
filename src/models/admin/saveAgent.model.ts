import mongoose from 'mongoose';
import saveAgentData from '../../libraries/interfaces';
/*********** saved videos model ************/
const { Schema } = mongoose;
const saveAgentSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        agentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        delBit: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);
export default mongoose.model<saveAgentData>('saveAgent', saveAgentSchema);
