import express from 'express';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  deleteWishlistItem
} from '../controller/wishlistController.js';

const router = express.Router();

router.post('/add-to-wishlist', addToWishlist);
router.post('/remove-from-wishlist', removeFromWishlist);
router.get('/:userId/wishlist', getWishlist);
router.post('/delete-wishlist-item', deleteWishlistItem); // optional

export default router;
