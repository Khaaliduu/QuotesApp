import Category from '../model/categoryModel.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get categories', error });
  }
};

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Public or Protected (as needed)
export const createCategory = async (req, res) => {
  try {
    const { name, image, description } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const category = new Category({ name, image, description });
    const saved = await category.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Public or Protected (as needed)
export const updateCategory = async (req, res) => {
  try {
    const { name, image, description } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name || category.name;
    category.image = image || category.image;
    category.description = description || category.description;

    const updated = await category.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Public or Protected (as needed)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
