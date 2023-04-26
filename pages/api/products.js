import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        const { title, description, price, images, category, properties } = req.body;
        const productDoc = await Product.create({
            title, description, price, images, category, properties,
        })
        res.json(productDoc);
    }
}