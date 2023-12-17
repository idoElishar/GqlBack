import { Request, Response } from 'express';
import bannerClicksService from './productClicks.service';

const getAllProductClicks = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Request received to get all products');
        const products = await bannerClicksService.getAllBannersClic();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getByBannerById = async (req: Request, res: Response): Promise<void> => {
    try {
        const bannerId = req.params.id;
        console.log(`Request received to get product clicks for banner ID: ${bannerId}`);
        const productClicks = await bannerClicksService.getByBannerById(bannerId);
        console.log("banners"+productClicks);
        if (productClicks) {
            res.status(200).json(productClicks);
        } else {
            res.status(404).json({ message: 'Banner not found' });
        }
    } catch (error) {
        console.error('Error fetching product clicks for banner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export default {
    getAllProductClicks,
    getByBannerById
};
