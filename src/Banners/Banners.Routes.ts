import express, { Router } from 'express';
import bannerController from './banners.Controller';
import { authenticateTokenAsync } from '../middleware/morgen/middleware';

const router: Router = express.Router();

router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBannerById);
router.get('/cat/:category', bannerController.getBannersByCategory);
router.get('/author/:author', bannerController.getBannersByAuthor);
router.get('/product/:productID', bannerController.getBannerByProductID);

router.post('/', authenticateTokenAsync, bannerController.createBanner);
router.put('/:id', authenticateTokenAsync, bannerController.updateBanner);
router.put('/addrating/:id', authenticateTokenAsync, bannerController.incrementBannerRating);
router.delete('/:id', authenticateTokenAsync, bannerController.deleteBanner);

export default router;
