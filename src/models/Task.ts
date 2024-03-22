import mongoose  from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "The title is very long"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("tasks", TaskSchema);
