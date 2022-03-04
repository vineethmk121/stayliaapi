import mongoose from 'mongoose';
import UserRoles from '../../libraries/interfaces';
/*********** roles model ************/
const { Schema } = mongoose;
const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: false
        },
        rights: [
            {
                icon: {
                    type: String
                },
                label: {
                    type: String
                },
                url: {
                    type: String
                },
                subs: [
                    {
                        icon: {
                            type: String
                        },
                        label: {
                            type: String
                        },
                        url: {
                            type: String
                        }
                    }
                ]
            }
        ],
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
export default mongoose.model<UserRoles>('role', roleSchema);
