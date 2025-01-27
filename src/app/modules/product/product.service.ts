import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constent';
import { ProductDetali } from './product.interface';
import { ProductModel } from './product.model';

const insertProductIntoDB = async (product: ProductDetali) => {
  const result = await ProductModel.create(product);
  return result;
};

// const getAllProdcuts = async (searchTerm?: string) => {
//   const filter: any = { isDeleted: false };

//   if (searchTerm) {
//     const searchRegex = new RegExp(searchTerm, 'i');
//     filter.$or = [
//       { name: searchRegex },
//       { brand: searchRegex },
//       { type: searchRegex },
//     ];
//   }
//   const result = await ProductModel.find(filter);
//   return result;
// };
const getAllProdcuts = async (query:Record<string,unknown>) => {
  const productQuery = new QueryBuilder(
    ProductModel.find({ isDeleted: false }),query,).search(productSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields()
  const result = await productQuery.modelQuery;

  return result;
  
};

const getProductById = async (productId: string) => {
  return await ProductModel.findById(productId);
};

const updateProductById = async (productId: string, updateData: any) => {
  const result = await ProductModel.findByIdAndUpdate(productId, updateData, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndUpdate(
    productId,
    { isDeleted: true },
    // { new: true },
  );
  return result;
};

export const ProductServices = {
  insertProductIntoDB,
  getAllProdcuts,
  getProductById,
  updateProductById,
  deleteProductFromDB,
};
