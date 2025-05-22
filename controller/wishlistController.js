import User from "../model/userModel.js";
import Quote from "../model/quotesModel.js";

// ✅ Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId, quoteId } = req.body;

    const quote = await Quote.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    let user = await User.findById(userId).populate("wishlist.quote");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyAdded = user.wishlist.some((item) =>
      item.quote._id.equals(quote._id)
    );

    if (alreadyAdded) {
      return res.status(400).json({ message: "Already added to wishlist" });
    }

    user.wishlist.push({ quote });
    user = await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ✅ Remove from wishlist using quoteId
export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, quoteId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter(
      (item) => item.quote.toString() !== quoteId
    );

    await user.save();

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ✅ Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("wishlist.quote");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// ✅ Optional: Remove by index (Haddii aad rabto inaad hayso)
export const deleteWishlistItem = async (req, res) => {
  try {
    const { userId, index } = req.body;

    let user = await User.findById(userId).populate("wishlist.quote");

    if (!user || index < 0 || index >= user.wishlist.length) {
      return res.status(400).json({ message: "Invalid index or user not found" });
    }

    user.wishlist.splice(index, 1);
    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
