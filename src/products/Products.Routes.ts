import express, { Router } from 'express';
import ProductController from './Product.controller';

const router: Router = express.Router();

router.get('/', ProductController.getAllBanners);

export default router;
