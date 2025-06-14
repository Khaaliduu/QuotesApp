import Users from "../model/userModel.js";
import Quotes from "../model/quotesModel.js";

// ✅ Add to wishlist (with null-check)
export const addToWishlist = async (req, res) => {
  try {
    const { userId, quoteId } = req.body;

    // 1. Hubi in quote jira
    const quote = await Quotes.findById(quoteId);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    // 2. Hel user + populate
    let user = await Users.findById(userId).populate("wishlist.quote");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Ka fakar quotes yaa horey ugu jira
    const alreadyExists = user.wishlist.some((item) => {
      return item.quote && item.quote._id && item.quote._id.equals(quote._id);
    });

    if (alreadyExists) {
      return res.status(400).json({ message: "Quote already in wishlist" });
    }

    // 4. Haddii aysan jirin hore, ku dar
    user.wishlist.push({ quote: quote._id });
    await user.save();

    // 5. Return updated user
    user = await Users.findById(userId).populate("wishlist.quote");
    res.status(200).json(user);
  } catch (e) {
    console.error("Error in addToWishlist:", e);
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
