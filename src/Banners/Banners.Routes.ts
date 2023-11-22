import express, { Router } from 'express';
import bannerController from './banners.Controller'; // שינוי שם היבוא

const router: Router = express.Router();

// עדכון הנתיבים והקונטרולרים להתייחסות ל-'banners'
router.get('/', bannerController.getAllBanners); // שינוי שם הפונקציה
router.get('/:id', bannerController.getBannerById); // שינוי שם הפונקציה
router.get('/cat/:category', bannerController.getBannersByCategory); // שינוי שם הפונקציה
router.get('/author/:author', bannerController.getBannersByAuthor);
router.get('/product/:productID', bannerController.getBannerByProductID);

router.post('/', bannerController.createBanner); // שינוי שם הפונקציה
router.put('/:id', bannerController.updateBanner); 
router.put('/addrating/:id', bannerController.incrementBannerRating); 
router.delete('/:id', bannerController.deleteBanner); // שינוי שם הפונקציה
// router.patch('/:id', bannerController.updateBannerQuantity); // השורה הזו תשתנה או תוסר אם לא רלוונטית ל-'banners'

export default router;