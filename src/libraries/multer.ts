import multer, { diskStorage } from 'multer';
import { sync } from 'mkdirp';
import { devConfig } from '../config/config';

//path where images gonna save
var upload_dir: string = 'uploads';

var storage = diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == 'profilePic') {
            upload_dir = `${devConfig.imagesPath.userProfilePic}`;
        } else if (file.fieldname == 'floor_image' || file.fieldname == 'property_image' || file.fieldname == 'property_vedio') {
            upload_dir = `${devConfig.images_path.PROPERTY}`;
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
