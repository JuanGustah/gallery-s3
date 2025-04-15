import multer from "multer";
import path from "path";
import { extractUserDataFromToken } from "../helpers/extractUserDataFromToken.helper";

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        const token = req.headers.authorization;
        const {userId} = extractUserDataFromToken(token as string);

        cb(null, file.fieldname+ "-"+ userId + '-' + Date.now() + path.extname(file.originalname));
    }
});

function checkFileType(file: Express.Multer.File, cb: any) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB
    fileFilter: function(_, file, cb) {
      checkFileType(file, cb);
    }
}).single('file');

export {upload as uploadMiddleware};
