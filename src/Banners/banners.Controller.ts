import { Request, Response } from 'express';
import productService from './banners.service';
import { BannerModel, bannerJoiSchema } from './Banners.model';

// Get all products
const getAllBanners = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Request received to get all products');
        const products = await productService.getAllBanners();
        console.log('Retrieved products:', products);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Get product by ID
const getBannerById = async (req: Request, res: Response): Promise<void> => {
    const bannerId = req.params.id; // Directly use the ID as a string
    try {
        const banner = await productService.getBannerById(bannerId); // Call the correct service method
        if (banner) {
            res.status(200).json(banner);
        } else {
            res.status(404).json({ message: 'Banner not found' }); // Update the message to reflect banners
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get banners by category
const getBannersByCategory = async (req: Request, res: Response): Promise<void> => {
    const category = req.params.category; // Get the category from request parameters
    try {
        const banners = await productService.getBannersByCategory(category);
        console.log('Retrieved products:', banners);
        if (banners.length > 0) {
            res.status(200).json(banners);
        } else {
            res.status(404).json({ message: 'No banners found in this category' });
        }
    } catch (error) {
        console.error('Error fetching banners by category:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Create new product
const createBanner = async (req: Request, res: Response): Promise<void> => {
    const newProduct = req.body;
    try {
        const product = await productService.createBanner(newProduct);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBanner = async (req: Request, res: Response): Promise<void> => {
    const bannerId = req.params.id; // Use the ID as a string
    const updatedBanner = req.body;
    try {
        const banner = await productService.updateBanner(bannerId, updatedBanner); // Call the correct service method
        if (banner) {
            res.status(200).json(banner);
        } else {
            res.status(404).json({ message: 'Banner not found' }); // Update the message to reflect banners
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Get banners by author
const getBannersByAuthor = async (req: Request, res: Response): Promise<void> => {
    const author = req.params.author;
    try {
        const banners = await productService.getBannersByAuthor(author);
        if (banners.length > 0) {
            res.status(200).json(banners);
        } else {
            res.status(404).json({ message: 'No banners found for this author' });
        }
    } catch (error) {
        console.error('Error fetching banners by author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const deleteBanner = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id
    try {
        const deletedProduct = await productService.deleteBanner(productId);
        if (deletedProduct) {
            res.status(200).json(deletedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
const incrementBannerRating = async (req: Request, res: Response): Promise<void> => {
    const bannerId = req.params.id;
    try {
        const banner = await productService.getBannerById(bannerId);
        if (!banner) {
            res.status(404).json({ message: 'Banner not found' });
            return;
        }

        const newRating = banner.rating ? banner.rating + 1 : 1;
        await productService.updateOneBanner(bannerId, { rating: newRating });
        const updatedBanner = await productService.getBannerById(bannerId);

        res.status(200).json(updatedBanner);
    } catch (error) {
        console.error('Error incrementing banner rating:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export default {
    getAllBanners,
    getBannerById,
    createBanner,
    updateBanner,
    deleteBanner,
    getBannersByCategory,
    getBannersByAuthor,
    incrementBannerRating
    // updateProductQuantity,
};
