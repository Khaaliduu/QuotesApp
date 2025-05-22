import express from 'express';
import {  addToWishlist,deleteWishlistItem,} from '../controller/wishlistController.js';



const router = express.Router()

router.route('/add-to-wishlist').post(addToWishlist)
router.route('/delete-wishlist-item').post(deleteWishlistItem)


export default router;