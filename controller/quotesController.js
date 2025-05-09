import Quotes from "../model/quotesModel.js";

// CREATE a new quote
export const createQuote = async (req, res) => {
  try {
    const newQuote = new Quotes(req.body);
    const savedQuote = await newQuote.save();
    res.status(201).json(savedQuote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quote", details: error.message });
  }
};

// GET all quotes
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quotes.find().populate("category");
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: "Failed to get quotes", details: error.message });
  }
};

// GET a single quote by ID
export const getQuoteById = async (req, res) => {
  try {
    const quote = await Quotes.findById(req.params.id).populate("category");
    if (!quote) return res.status(404).json({ message: "Quote not found" });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: "Failed to get quote", details: error.message });
  }
};

// UPDATE quote by ID
export const updateQuote = async (req, res) => {
  try {
    const updatedQuote = await Quotes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedQuote) return res.status(404).json({ message: "Quote not found" });
    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ error: "Failed to update quote", details: error.message });
  }
};

// DELETE quote by ID
export const deleteQuote = async (req, res) => {
  try {
    const deleted = await Quotes.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Quote not found" });
    res.json({ message: "Quote deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete quote", details: error.message });
  }
};
