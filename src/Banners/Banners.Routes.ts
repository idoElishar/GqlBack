import express, { Router } from 'express';
import bannerController from './banners.Controller';
import { authenticateToken } from '../middleware/morgen/middleware';

const router: Router = express.Router();

router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBannerById);
router.get('/cat/:category', bannerController.getBannersByCategory);
router.get('/author/:author', bannerController.getBannersByAuthor);
router.get('/product/:productID', bannerController.getBannerByProductID);

router.post('/', authenticateToken, bannerController.createBanner);
router.put('/:id', authenticateToken, bannerController.updateBanner);
router.put('/addrating/:id', authenticateToken, bannerController.incrementBannerRating);
router.delete('/:id', authenticateToken, bannerController.deleteBanner);

export default router;
