import { Request, Response } from "express";
import { ProductModel } from "../models/Product.ts";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.create(req.body);
    res.status(201).json({
      message: "Bike created successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create product",
      success: false,
      error,
    });
  }
};


const getAllBikes = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    let products;
    if (searchTerm) {
      products = await ProductModel.find({
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { brand: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      });
    } else {
      
      products = await ProductModel.find();

    }

    res.status(200).json({
      message: "Bikes retrieved successfully",
      status: true,
      data: products,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Failed to retrieve bikes",
        success: false,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    } else {
      res.status(500).json({
        message: "Failed to retrieve bikes",
        success: false,
        error: {
          message: "Unknown error occurred",
        },
      });
    }
  }
};




const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const product = await ProductModel.findById(id);
    console.log(product);
    
    if(!product){
      res.status(200).json({
        message: "No matching bike found",
        success: true,
        data: product,
      });
      return
    }
    res.status(200).json({
      message: "Bike retrieved successfully",
      success: true,
      data: product,
    });
    
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: "Failed to calculate revenue",
        success: false,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }else {
      res.status(500).json({
        message: "Failed to create order",
        success: false,
        error: {
          message: "Unknown error occurred",
        },
      });
    }
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    console.log(updatedProduct);
    

    res.status(200).json({
      message: "Bike updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: "Failed to calculate revenue",
        success: false,
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }else {
      res.status(500).json({
        message: "Failed to create order",
        success: false,
        error: {
          message: "Unknown error occurred",
        },
      });
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
       res.status(404).json({
        message: "Product not found",
        success: false,
      });
      return
    }


    res.status(200).json({
      message: "Bike deleted successfully",
      success: true,
      data: deletedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete product",
      success: false,
      error,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllBikes,
  getProductById,
  updateProduct,
  deleteProduct,
};
