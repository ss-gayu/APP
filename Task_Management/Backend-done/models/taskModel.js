const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        workTitle: {
            type: String,
            trim: true,
        }, // one way to add a property in schema
        deadline: Date, // one way to add a property in schema
        taskTitle: {
            // another way to add a property in schema :: this helps you to add validations
            type: String,
            required: true,
            trim: true,
            // unique: true, //TODO: between different users, I want the task title to get repeated but not repeated for same user
        },
        assignee: {
            type: String,
            required: true,
            trim: true,
        },
        assignor: {
            type: String,
            required: true,
            trim: true,
        },
        priority: {
            type: String,
            default: "normal", 
            enum: ["normal", "low", "high", "urgent"], 
        },
        status: {
            type: String,
            default: "todo",
            enum: ["done", "inprogress", "todo", "abandoned"], 
        },
    },
    {
        timestamps: true, 
    }
);

const Task = mongoose.model("tasks", taskSchema); 

module.exports = Task;