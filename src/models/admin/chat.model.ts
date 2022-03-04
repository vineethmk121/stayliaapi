import mongoose from 'mongoose';
import chatData from '../../libraries/interfaces';
const Schema = mongoose.Schema;
/*********** Chat management model ************/
const chatSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        repliedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'chat',
            default: null
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'conversation',
            required: true
        },
        statusBit: {
            type: String,
            default: 'pending'
        }
    },
    { timestamps: true }
);
export default mongoose.model<chatData>('chat', chatSchema);
