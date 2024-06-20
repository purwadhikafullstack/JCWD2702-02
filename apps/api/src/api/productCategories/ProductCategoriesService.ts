import { prisma } from './../../lib/PrismaClient';
import { IProductCategory } from './ProductCategoriesTypes';

// Query for get all product Categories
export const getProductCategoriesQuery = async () => {
    return await prisma.category.findMany(
        {
            where: {
                deletedAt: null
            }
        }
    );
};

// Query for get category by id
export const getCategoryByIdQuery = async (id: string) => {
  return await prisma.category.findUnique({
    where: { id: parseInt(id) },
  });
};

// Query for create category
export const createCategoryAndCategoryImagesQuery = async (
  data: IProductCategory,
  files: any,
) => {
  return await prisma.category.create({
    data: {
      name: data.name,
      categoryUrl: files[0].path,
    },
  });
};

// Query for delete category
export const deleteCategoryAndCategoryImagesQuery = async (categoryId: string) => {
    const relatedProducts = await prisma.product.findMany({
        where: {
            categoryId: parseInt(categoryId)
        }
    });
    if (relatedProducts.length > 0) {
        throw new Error('Cannot delete category because there are still products associated with it.');
    }
    return await prisma.category.delete({
        where: {
            id: parseInt(categoryId)
        },
    });
}

// Query for soft delete category
export const softDeleteCategoryAndCategoryImagesQuery = async (categoryId: string) => {
    const relatedProducts = await prisma.product.findMany({
        where: {
            categoryId: parseInt(categoryId)
        }
    });

    if (relatedProducts.length > 0) {
        throw new Error('Cannot delete category because there are still products associated with it.');
    }
    return await prisma.category.update({
        where: {
            id: parseInt(categoryId)
        },
        data: {
            deletedAt: new Date()
        },
    });
}

// Query for update category
export const updateCategoryAndCategoryImagesQuery = async (categoryId: string, data: Partial<IProductCategory>, files: any) => {
    const updateData: { name?: string, categoryUrl?: string } = {};

    if (data.name) {
        updateData.name = data.name;
    }

    if (files && files.length > 0) {
        updateData.categoryUrl = files[0].path;
    }

    return await prisma.category.update({
        where: { id: parseInt(categoryId) },
        data: updateData
    });
};
