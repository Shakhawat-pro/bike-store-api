import express, { Request, Response } from "express";
import { productRouter } from "./app/routes/productRoutes";
import cors from 'cors';
import { OrderRouter } from "./app/routes/orderRoutes";
const app = express();

app.use(express.json())
app.use(cors());

app.use("/api/products", productRouter);
app.use("/api/orders", OrderRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});


export default app;
