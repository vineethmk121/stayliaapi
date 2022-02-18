import mongoose from 'mongoose';

/*********** roles model ************/
const { Schema } = mongoose;
const roleSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        rights: [
            {
                id: {
                    type: String
                },
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
export default mongoose.model('role', roleSchema);
