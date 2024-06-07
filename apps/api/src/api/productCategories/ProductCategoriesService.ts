import { prisma } from './../../lib/PrismaClient';
import { IProductCategory } from './ProductCategoriesTypes';

// Query for get all product Categories
export const getProductCategoriesQuery = async () => {
    return await prisma.category.findMany();
};

// Query for get category by id
export const getCategoryByIdQuery = async (id: string) => {
    return await prisma.category.findUnique({
        where: { id: parseInt(id) },
    });
};

// Query for create category
export const createCategoryAndCategoryImagesQuery = async (data: IProductCategory, files: any) => {
    return await prisma.category.create({
        data: {
            name: data.name,
            categoryUrl: files[0].path
        }
    })
}

// Query for delete category
export const deleteCategoryAndCategoryImagesQuery = async (categoryId: string) => {
    return await prisma.category.delete({
        where: { id: parseInt(categoryId) },
    })
}

// Query for update category
export const updateCategoryAndCategoryImagesQuery = async (categoryId: string, data: IProductCategory, files: any) => {
    return await prisma.category.update({
        where: { id: parseInt(categoryId) },
        data: {
            name: data.name,
            categoryUrl: files[0].path
        }
    })
}