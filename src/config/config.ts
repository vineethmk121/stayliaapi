import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

//const BASE_IMAGE_URL = "https://appcrates.net:"+process.env.PORT;
//const ROUTE_IMAGE_PATH = "dist/uploads/images" //FOR BUILD

const BASE_IMAGE_URL = 'http://localhost:5555';
const ROUTE_IMAGE_PATH = 'src/uploads/images'; //FOR DEV

export const devConfig: any = {
    port: process.env.PORT,
    db_username: process.env.DATABASE_USERNAME,
    db_password: process.env.DATABASE_PASSWORD,
    db_name: process.env.DATABASE_NAME,
    db_host: process.env.DATABASE_HOST,
    secret: process.env.SECRET_KEY,
    secondSecret: process.env.SECOND_SECRET_KEY,
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    twilioNumber: process.env.TWILIO_PHONE_NUMBER,
    myNumber: process.env.MY_NUMBER,

    imagesPath: {
        userProfilePic: `${ROUTE_IMAGE_PATH}/profilePic`,
        imagePropertyName2: `${ROUTE_IMAGE_PATH}/folderName`
    },
    getImagesPath: {
        userProfilePic: `${BASE_IMAGE_URL}/profilePic`,
        imagePropertyName2: `${BASE_IMAGE_URL}/folderName`
    },
    email: {
        SERVICE: 'Gmail',
        USER: 'qa.appcrates@gmail.com',
        PASSOWRD: 'Appcrates123',
        FROM: 'qa.appcrates@gmail.com'
    }
};
