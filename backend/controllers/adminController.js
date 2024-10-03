import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experiance,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experiance ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // Validating password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    // Hashing doctor password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experiance,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      image: imageUrl,
    };

    // Save doctor in the database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//API for Admin Login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.status(200).json({
        success: true,
        token,
        message: "Admin logged in successfully",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addDoctor, loginAdmin };
