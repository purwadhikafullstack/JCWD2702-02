import fs from 'fs';

export const DeletedProductCategoryUrlFiles = (files: any) => {
  if (files) {
    const uploadedProductCategoryUrl = Array.isArray(files)
      ? files
      : files['categoryurl'];
    if (Array.isArray(uploadedProductCategoryUrl)) {
      uploadedProductCategoryUrl.forEach((file: any) => {
        fs.rmSync(file.path);
      });
    }
  }
};
