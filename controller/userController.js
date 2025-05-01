// controllers/userController.js
import User from "../model/userModel.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: "Wrong password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
// Create New User
export const createUser = async (req, res) => {
  try {
    const { image, name, email, phone, password, isAdmin } = req.body;

    // Ensure phone is a number (convert from string to number if necessary)
    const phoneNumber = typeof phone === 'string' ? parseFloat(phone) : phone;

    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = await User.create({
        image: image || 'https://i.pravatar.cc/150?img=3', // Haddii image la'aan yahay default-user.jpg dhig
        name,
        email,
        phone: phoneNumber,
        password,
        isAdmin: isAdmin || false,
      });

      res.status(201).json(newUser);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
// Update User
export const updateUser = async (req, res) => {
  try {
    const { image, name, email, phone, password, isAdmin } = req.body;

    // Ensure phone is a number (convert from string to number if necessary)
    const phoneNumber = typeof phone === 'string' ? parseFloat(phone) : phone;

    const user = await User.findById(req.params.id);

    if (user) {
      user.image = image || user.image; // Haddii image cusub yimaado update, haddii kale sii hay kii hore
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phoneNumber || user.phone;
      user.password = password || user.password;
      user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
