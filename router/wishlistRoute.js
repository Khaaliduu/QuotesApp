import express from 'express';
import {
  addToWishlist,
  deleteWishlistItem
} from '../controller/wishlistController.js';

const router = express.Router();

router.route('/').post(addToWishlist)
// router.post('/remove-from-wishlist', removeFromWishlist);
// router.get('/:userId/wishlist', getWishlist);
router.route('/delete-wishlist-item').post(deleteWishlistItem)

export default router;
