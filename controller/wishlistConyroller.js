export const addToWishlist = async (req, res) => {
    try {
      const { userId, quoteId } = req.body;
  
      const quote = await quote.findById(quoteId);
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }
  
      let user = await user.findById(userId).populate("wishlist.quote");
  
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
  


/// |\\\\\\\\\\\\\\\\\\\\\\\\\\\|
/// |///Delete Wishlist item \\\|
/// |\\\\\\\\\\\\\\\\\\\\\\\\\\\|
export const deleteWishlistItem = async (req, res) => {
  try {
    const { userId, index } = req.body;

    // ✅ Saxida populate-ga: "wishlist.quote" halkii ay ka ahayd "wishlist.course"
    let user = await Users.findById(userId).populate("wishlist.quote");

    if (!user || index < 0 || index >= user.wishlist.length) {
      return res.status(400).json({ message: "Invalid index or user not found" });
    }

    // ✅ Tirtirka quote-ga wishlist-ka
    user.wishlist.splice(index, 1);

    // ✅ Save
    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
