import mongoose from 'mongoose';
import chalk from 'chalk';

import { devConfig } from '../config/config';

export const configureDb = () => {
    mongoose.Promise = global.Promise;
    mongoose
        .connect(
            //`mongodb+srv://StayliaDB:<password>@cluster0.nblrh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
            `mongodb+srv://${devConfig.db_username}:${devConfig.db_password}@${devConfig.db_host}/${devConfig.db_name}?retryWrites=true&w=majority`,
            //`mongodb://localhost/${devConfig.db_name}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
            }
        )
        .then(() => console.log('%s Database connected successfully!', chalk.green('✓')))
        .catch((err) => console.error('Could not connect to Mongodb.. ', err));
};
