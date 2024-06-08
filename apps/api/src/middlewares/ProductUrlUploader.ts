import { Request, Response, NextFunction } from 'express';
import { multerProductUrlUpload } from '@/helpers/ProductMulter';
import { DeletedProductUrlFiles } from '@/helpers/DeleteProductUrlFiles';

export const productUrlUploader = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const upload = multerProductUrlUpload.fields([
    { name: 'producturl', maxCount: 5 },
  ]);

  upload(req, res, (err) => {
    try {
      if (err) throw new Error(err.message);
      if (req.files) {
        const uploadedFiles = Array.isArray(req.files)
          ? req.files
          : req.files['producturl'];
        if (Array.isArray(uploadedFiles)) {
          uploadedFiles.forEach((file: any) => {
            if (file.size > 1 * 1024 * 1024)
              throw new Error(`File ${file.originalname} is too large`);
          });
        }
      }
      next();
    } catch (error: any) {
      DeletedProductUrlFiles(req.files);
      next({
        status: 400,
        message: error.message,
      });
    }
  });
};
