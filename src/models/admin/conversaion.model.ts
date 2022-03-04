import mongoose from 'mongoose';
import conversaionData from '../../libraries/interfaces';
const Schema = mongoose.Schema;
/*********** Conversation management model ************/
const conversationSchema = new Schema(
    {
        lastMessage: {
            type: String,
            required: true
        },
        loginId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            default: null
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
    },
    { timestamps: true }
);
export default mongoose.model<conversaionData>('conversation', conversationSchema);
