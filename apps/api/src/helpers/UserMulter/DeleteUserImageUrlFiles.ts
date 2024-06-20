import fs from 'fs';

export const DeletedUserImageUrlFiles = (files: any) => {
  if (files) {
    const uploadedUserImageUrl = Array.isArray(files)
      ? files
      : files['userimageurl'];
    if (Array.isArray(uploadedUserImageUrl)) {
      uploadedUserImageUrl.forEach((file: any) => {
        fs.rmSync(file.path);
      });
    }
  }
};
