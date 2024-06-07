import multer from 'multer';
import fs from 'fs';

const defaultDir = 'src/public/productImage';

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const childDirectoryBasedOnMimetype = file.mimetype.split('/')[0];
    const isDirectoryExist = fs.existsSync(
      `${defaultDir}/${childDirectoryBasedOnMimetype}`,
    );
    if (isDirectoryExist === false)
      fs.mkdirSync(`${defaultDir}/${childDirectoryBasedOnMimetype}`, {
        recursive: true,
      });
    cb(null, `${defaultDir}/${childDirectoryBasedOnMimetype}`);
  },
  filename: (req: any, file: any, cb: any) => {
    const randomName =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const splitOriginalName = file.originalname.split('.');
    const fileExtension = splitOriginalName[splitOriginalName.length - 1];
    cb(null, `${Date.now()}_${randomName}.${fileExtension}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const fileAccepter = ['webp', 'jpg', 'jpeg', 'png', 'svg', 'gif'];
  const splitOriginalName = file.originalname.split('.');
  const fileExtension = splitOriginalName[splitOriginalName.length - 1];

  if (!fileAccepter.includes(fileExtension))
    return cb(new Error('Only accept webp, jpg, jpeg, png, svg, gif'), false);
  cb(null, true);
};

<<<<<<< HEAD:apps/api/src/helpers/Multer.ts
export const multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
=======
export const multerProductUrlUpload = multer({ storage: storage, fileFilter: fileFilter })
>>>>>>> dev:apps/api/src/helpers/ProductMulter.ts
