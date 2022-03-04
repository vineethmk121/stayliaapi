import multer, { diskStorage } from 'multer';
import { sync } from 'mkdirp';
import { devConfig } from '../config/config';

//path where images gonna save
var upload_dir: string = 'uploads';

var storage = diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == 'profilePic') {
            upload_dir = `${devConfig.imagesPath.userProfilePic}`;
        } else if (file.fieldname == 'specialtyIcon') {
            upload_dir = `${devConfig.imagesPath.specialtyIcon}`;
        } else if (file.fieldname == 'overViewIcon') {
            upload_dir = `${devConfig.imagesPath.overViewIcon}`;
        } else if (file.fieldname == 'amenitiesIcon') {
            upload_dir = `${devConfig.imagesPath.specialtyIcon}`;
        } else if (file.fieldname == 'gallaryImages') {
            upload_dir = `${devConfig.imagesPath.gallaryImages}`;
        } else if (file.fieldname == 'sliderImages') {
            upload_dir = `${devConfig.imagesPath.sliderImages}`;
        } else if (file.fieldname == 'propertyPlan') {
            upload_dir = `${devConfig.imagesPath.propertyPlan}`;
        } else if (file.fieldname == 'profilePic') {
            upload_dir = `${devConfig.imagesPath.mobileUser}`;
        }

        sync(upload_dir); //create directories if not exist
        cb(null, upload_dir);
    },
    filename: (req, file, cb) => {
        var originalname = file.originalname;
        var extension = originalname.split('.');
        let filename = file.fieldname + '-' + Date.now() + '.' + extension[extension.length - 1]; // file save with original extension
        cb(null, filename);
    }
});

var upload = multer({
    storage: storage
});
export default upload;
