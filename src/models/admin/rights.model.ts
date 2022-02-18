import mongoose from 'mongoose';
import UserRights from '../../libraries/interfaces';
/*********** rights model ************/
const { Schema } = mongoose;
const rightSchema = new Schema(
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
    },
    { timestamps: true }
);
export default mongoose.model<UserRights>('rights', rightSchema);
