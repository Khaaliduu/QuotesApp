import express from "express";
import {
  createQuote,
  getAllQuotes,
  getQuoteById,
  updateQuote,
  deleteQuote,
} from "../controller/quotesController.js";

const router = express.Router();

// POST: Create new quote
router.post("/", createQuote);

// GET: Get all quotes
router.get("/", getAllQuotes);

// GET: Get single quote by ID
router.get("/:id", getQuoteById);

// PUT: Update quote by ID
router.put("/:id", updateQuote);

// DELETE: Delete quote by ID
router.delete("/:id", deleteQuote);

export default router;
