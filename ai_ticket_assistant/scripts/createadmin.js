import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const email = "admin@gmail.com";
    const password = "admin123";

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
      role: "admin",
      skills: [],
    });

    console.log("🎉 Admin created successfully");
    console.log("📧 Email:", email);
    console.log("🔑 Password:", password);

    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to create admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
