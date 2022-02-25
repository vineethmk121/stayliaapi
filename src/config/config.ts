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
        specialtyIcon: `${ROUTE_IMAGE_PATH}/specialtyIcon`,
        overViewIcon: `${ROUTE_IMAGE_PATH}/overViewIcon`,
        amenitiesIcon: `${ROUTE_IMAGE_PATH}/amenitiesIcon`,
        gallaryImages: `${ROUTE_IMAGE_PATH}/gallaryImages`,
        sliderImages: `${ROUTE_IMAGE_PATH}/sliderImages`,
        propertyPlan: `${ROUTE_IMAGE_PATH}/propertyPlan`
    },
    getImagesPath: {
        userProfilePic: `${BASE_IMAGE_URL}/profilePic`,
        specialtyIcon: `${BASE_IMAGE_URL}/specialtyIcon`,
        overViewIcon: `${BASE_IMAGE_URL}/overViewIcon`,
        amenitiesIcon: `${BASE_IMAGE_URL}/amenitiesIcon`,
        gallaryImages: `${BASE_IMAGE_URL}/gallaryImages`,
        sliderImages: `${BASE_IMAGE_URL}/sliderImages`,
        propertyPlan: `${BASE_IMAGE_URL}/propertyPlan`
    },
    email: {
        SERVICE: 'Gmail',
        USER: 'qa.appcrates@gmail.com',
        PASSOWRD: 'Appcrates123',
        FROM: 'qa.appcrates@gmail.com'
    }
};
