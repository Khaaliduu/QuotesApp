import Users from "../model/userModel.js";
import Quotes from "../model/quotesModel.js";

// ✅ Add to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { userId, quoteId } = req.body;

    // Hubi in quote uu jiro
    const quote = await Quotes.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // Hel user + populate quotes
    let user = await Users.findById(userId).populate("wishlist.quote");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if quote already exists
    const alreadyExists = user.wishlist.some((item) =>
      item.quote._id.equals(quote._id)
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Quote already in wishlist" });
    }

    // Add quote to wishlist
    user.wishlist.push({ quote: quote._id });

    // Save user
    await user.save();

    // Dib u hel user-ka si updated list loo celiyo
    user = await Users.findById(userId).populate("wishlist.quote");

    res.status(200).json(user);
  } catch (e) {
    console.error("Error adding to wishlist:", e);
    res.status(500).json({ error: e.message });
  }
};

// ✅ Delete from wishlist
export const deleteWishlistItem = async (req, res) => {
  try {
    const { userId, index } = req.body;

    let user = await Users.findById(userId).populate("wishlist.quote");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (index < 0 || index >= user.wishlist.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    // Remove item
    user.wishlist.splice(index, 1);
    await user.save();

    // Return updated user
    user = await Users.findById(userId).populate("wishlist.quote");
    res.status(200).json(user);
  } catch (e) {
    console.error("Error deleting from wishlist:", e);
    res.status(500).json({ error: e.message });
  }
};
