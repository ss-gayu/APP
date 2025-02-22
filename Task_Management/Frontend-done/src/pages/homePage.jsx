import { useEffect, useState } from "react";
import TaskForm from "../components/taskForm";
import TaskList from "../components/taskList";
import TaskFilters from "../components/taskFilters";
import "./homePage.css";

const HomePage = () => {
    // let list = []; 
    const [list, setList] = useState([]); // array : length can change, order of elements can change
    const [filtersObj, setFiltersObj] = useState({
        priority: "",
    });
    // A,B,C,D --> 2: C
    // C,A,B,D --> 2: B
    // de-coupling

    const getData = async () => {
        const query = [];
        if (filtersObj.priority) {
            query.push(`priority=${filtersObj.priority}`);
        }
        console.log(query);
        const resp = await fetch(`
            ${import.meta.env.VITE_BACKEND_URL}/tasks?${query}
        `);
        const respBody = await resp.json();
        // list = respBody.data.tasks;
        const arrayOfTaskList = respBody.data.tasks;
        setList(arrayOfTaskList);
    };

    // getData(); 
    useEffect(() => {
        getData();
    }, [filtersObj]);

    return (
        <div>
            <h2>Welcome to Task Management Tool!</h2>
            <TaskForm getData={getData} />
            <TaskFilters setFiltersObj={setFiltersObj} />
            <div className="multi-task-lists-container">
                <TaskList list={list} getData={getData} filterObj={{ status: "todo" }} title="Todo List" />
                <TaskList list={list} getData={getData} filterObj={{ status: "done" }} title="Done List" />
            </div>
        </div>
    );
};

export default HomePage;