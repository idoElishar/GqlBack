import { Request, Response } from 'express';
import axios from 'axios'
const STORE_SERVER = process.env.STORE_SERVER || "https://store-back-3.onrender.com";

const getAllBanners = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Request received to get all products');
        const response = await axios.get((`${STORE_SERVER}/products`));
        const products = response.data;
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export default {
    getAllBanners,
 
};
