import fs from 'fs'

export const DeletedProductUrlFiles = (files: any) => {
    if (files) {
        const uploadedProductUrl = Array.isArray(files) ? files : files['producturl'];
        if (Array.isArray(uploadedProductUrl)) {
            uploadedProductUrl.forEach((file: any) => {
                fs.rmSync(file.path)
            })
        }
    }
}