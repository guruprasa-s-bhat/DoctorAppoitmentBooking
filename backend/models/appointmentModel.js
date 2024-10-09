import mongoose from "mongoose";

const appointmentShema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  docId: {
    type: String,
    required: true,
  },
  slotDate: {
    type: Date,
    required: true,
  },
  slotTime: {
    type: Date,
    required: true,
  },
  docData: {
    type: Object,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  canelled: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentShema);

export default appointmentModel;
