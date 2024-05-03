import { diskStorage } from 'multer';
import { resolve } from 'path';

const multerConfig = {
  storage: diskStorage({
    destination(req, file, cb) {
      cb(null, resolve(__dirname, '..', '..', '..', 'uploads', 'images'));
    },
    filename(req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpeg`);
    },
  }),
};

export default multerConfig;
