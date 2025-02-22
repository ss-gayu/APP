require("dotenv").config();
const express = require("express");
require("./config/dbConfig.js");
const Task = require("./models/taskModel.js");
const cors = require("cors"); // import cors

const PORT = process.env.PORT || 2001;

const app = express();

app.use(cors()); 
app.use(express.json());


app.use((req, res, next) => {
    console.log("-->", req.method, "-->", req.url);
    
    next();
}); 

app.get("/", (req, res) => {
    res.send(`<h1>Server is running ...</h1>`);
});

// FILTER API ?? GET API :: /tasks

// READ --> Filter --> List API
app.get("/tasks", async (req, res) => {
    try {
        const queryObj = req.query;
        const { priority = "" } = queryObj || {};

        
        const tasksQuery = Task.find();
        if (priority.length > 0) {
            tasksQuery.where("priority").equals(priority);
        }

        const tasks = await tasksQuery; 

        res.status(200);
        res.json({
            status: "success",
            data: {
                tasks,
                total: tasks.length,
            },
        });
    } catch (err) {
        console.log("Error in POST /tasks", err.message);
        res.status(500).json({ status: "fail", message: "Internal Server Error" });
    }
});

// CREATE
app.post("/tasks", async (req, res) => {
    try {
        
        const taskInfo = req.body;

        
        const newTask = await Task.create(taskInfo);

        res.status(201); //created
        res.json({
            status: "success",
            data: {
                task: newTask,
            },
        });
    } catch (err) {
        console.log("Error in POST /tasks", err.message);
        if (err.name === "ValidationError") {
            res.status(400).json({ status: "fail", message: err.message });
        } else {
            res.status(500).json({ status: "fail", message: "Internal Server Error" });
        }
    }
});

// HW --> https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
// PATCH API / UPDATE :: MEDIUM LEVEL DSA Question (Handle All possible edge-cases )
app.patch("/tasks/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const { workTitle, assignee, priority, status } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                workTitle,
                assignee,
                priority,
                status,
            },
            {
                returnDocument: "after", 
                runValidators: true, 
            }
        ); 
        if (updatedTask === null) {
            res.status(400).json({
                status: "fail",
                message: "Task ID does not exists!",
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                task: updatedTask,
            },
        });
    } catch (err) {
        console.log("Error in PATCH /tasks", err.message);
       
        if (err.name === "CastError") {
            res.status(400).json({
                status: "fail",
                message: "Invalid parameter",
            });
        }
        
        else if (err.name === "ValidationError") {
            res.status(400).json({ status: "fail", message: err.message });
        }
        
        else {
            res.status(500).json({ status: "fail", message: "Internal Server Error" });
        }
    }
});

// DELETE
app.delete("/tasks/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const result = await Task.findByIdAndDelete(taskId);
        if (result === null) {
            res.status(400).json({
                status: "fail",
                message: "Task ID does not exists!",
            });
        } else {
            res.status(204).json({
                status: "success",
                data: {
                    result,
                },
            });
        }
    } catch (err) {
        console.log(err.message);
        if (err.name == "CastError") {
            res.status(400).json({
                status: "fail",
                message: "Invalid parameter",
            });
        } else {
            res.status(500).json({
                status: "fail",
                message: "Internal Server Error",
            });
        }
    }
});

app.listen(PORT, () => {
    console.log("------------------------------------------");
    console.log(`--------- http://localhost:${PORT}/ ---------`);
    console.log("------------------------------------------");
});