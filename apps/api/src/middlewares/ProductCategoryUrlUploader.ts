import { Request, Response, NextFunction } from 'express';
import { multerProductCategoryUrlUpload } from '@/helpers/ProductCategoryMulter';
import { DeletedProductCategoryUrlFiles } from '@/helpers/DeleteProductCategoryUrlFiles';

export const productCategoryUrlUploader = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const upload = multerProductCategoryUrlUpload.fields([
    { name: 'categoryurl', maxCount: 1 },
  ]);

  upload(req, res, (err) => {
    try {
      if (err) throw new Error(err.message);
      if (req.files) {
        const uploadedFiles = Array.isArray(req.files)
          ? req.files
          : req.files['categoryurl'];
        if (Array.isArray(uploadedFiles)) {
          uploadedFiles.forEach((file: any) => {
            if (file.size > 1 * 1024 * 1024)
              throw new Error(`File ${file.originalname} is too large`);
          });
        }
      }
      next();
    } catch (error: any) {
      DeletedProductCategoryUrlFiles(req.files);
      next({
        status: 400,
        message: error.message,
      });
    }
  });
};
