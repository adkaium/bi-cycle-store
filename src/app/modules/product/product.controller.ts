import { Request, Response } from 'express';
import { ProductServices } from './product.service';

const creatPorduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await ProductServices.insertProductIntoDB(product);

    // send response
    res.status(200).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getsProduts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const result = await ProductServices.getAllProdcuts(searchTerm as string);

    // send response
    res.status(200).json({
      success: true,
      message: 'get all Bicycle successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const productById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const product = await ProductServices.getProductById(productId);

    if (!product || product.isDeleted) {
      res.status(404).json({
        message: 'Bicycle not found',
        status: false,
      });
    }
    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      status: true,
      data: product,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedProduct = await ProductServices.updateProductById(
      productId,
      updateData,
    );
    if (!updatedProduct) {
      res.status(404).json({
        message: 'Bicycle not Found',
        status: false,
      });
    }
    res.status(200).json({
      message: 'Bicycle updated successfully',
      status: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await ProductServices.deleteProductFromDB(productId);

    if (!deletedProduct) {
      res.status(404).json({
        message: 'Bicycle not found',
        status: false,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product is deleted succesfully',
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
    });
  }
};

// const deleteProduct = async (req: Request, res: Response) => {
//   try {
//     const { productId } = req.params;

//     const result = await ProductServices.d(productId as string);

//     res.status(200).json({
//       success: true,
//       message: 'Product is deleted succesfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       messege: error.message || 'someting went wrong',
//       error,
//     });
//   }
// };
export const ProductControllers = {
  creatPorduct,
  getsProduts,
  productById,
  updateProduct,
  deleteProduct,
};