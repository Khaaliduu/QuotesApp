import Users from "../model/userModel.js";
import Quotes from "../model/quotesModel.js";

// ✅ Add to wishlist

export const addToWishlist  = async(req, res) => {
  try {

      
      const {userId, quoteId} = req.body;

      const quote = await Quotes.findById(quoteId);
      let user = await Users.findById(userId).populate("wishlist.Quote")
      if (user.wishlist.length == 0) {
          user.wishlist.push({quote})
      
      }else{
          let isQuotesFound = false;
          for (let i=0;i<user.wishlist.length;i++){
              if (user.wishlist[i].quote._id.equals(quote._id)){
                isQuotesFound = true;
              }
          }
          if (isQuotesFound) {
             res.status(400).json({message:"already added"})

          }else{
              user.wishlist.push({quote})
          }
      }

      
      

      user = await user.save()
      res.status(200).json(user)


  } catch (e) {
      res.status(500).json({ error: e.message });
  }
}


export const deleteWishlistItem  = async(req, res) => {
    try {

        
        const {userId, index} = req.body;
        let user = await Users.findById(userId).populate("wishlist.Quote")

        if (user) {
            user.wishlist.splice(index, 1)
        }


        user = await user.save()
        res.status(200).json(user)


    } catch (e) {
        res.status(500).json({ error: e.message });
    }}

