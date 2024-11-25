import { Request, Response } from "express";
import { OrderModel } from "../models/Order";
import { ProductModel } from "../models/Product.ts";

const orderBike = async (req: Request, res: Response) => {
  try {
    const { email, product: productId, quantity, totalPrice: providedTotalPrice } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
      res.status(404).json({
        message: "Product not found",
        success: false,
      });
      return;
    }

    if (product.quantity < quantity) {
      res.status(400).json({
        message: "Insufficient stock",
        success: false,
      });
      return;
    }

    const totalPrice = providedTotalPrice || product.price * quantity;

    const order = await OrderModel.create({
      email,
      product: productId,
      quantity,
      totalPrice,
    });

    // Update product inventory
    product.quantity -= quantity;
    product.inStock = product.quantity > 0;
    await product.save();

    // Respond with success
    res.status(201).json({
      message: "Order created successfully",
      success: true,
      data: order,
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Failed to create order",
        success: false,
        error: {
          message: error.message,
        },
        stack: error.stack,
      });
    } else {
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


const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderModel.aggregate([
      {
        $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } }
      },
    ]);
    console.log(revenue);

    // If no orders exist, set total revenue to 0
    const totalRevenue = revenue.length > 0 ? revenue[0].totalRevenue : 0;

    res.status(200).json({
      message: "Total revenue calculated successfully",
      success: true,
      data: { totalRevenue },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        message: "Failed to calculate revenue",
        success: false,
        error: {
          message: error.message,
        },
        stack: error.stack,
      });
    }
  }
};


export const orderControllers = {
  orderBike,
  calculateRevenue
};
