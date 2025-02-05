import { Box, Card, CardContent, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ITaskList from "../data_interfaces/ITaskList";
import { v4 as uuid } from "uuid";
import ITask from "../data_interfaces/ITask";
import TaskDS from "../data_services/TaskDS";
import { Task } from "@mui/icons-material";

type TasksProps = {
    taskList : ITaskList | null;
}

function Tasks({taskList}: TasksProps) {

    const [taskName, setTaskName] = React.useState("");
    const [tasks, setTasks] = React.useState<ITask[]>([]);

    useEffect(() => {
        TaskDS.getAll(taskList?.id as string).then(tasksPrise => {
            setTasks(tasksPrise);
        });},[taskList?.id]);

    const HandleCreateTask = (taskListId : string) => {
        const id: string = uuid();
        const laTask : ITask = {id : id, name: taskName, important: false, completed: false};
        TaskDS.create(taskListId, laTask);
        TaskDS.getAll(taskList?.id as string).then(tasksPrise => {
            setTasks(tasksPrise);});
    }
    const card = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h4" component="div">
                    {taskList?.name}
                </Typography>
                <Typography variant="h5" component="div">
                    Taches à faire
                </Typography>
                <TextField
                variant="standard"
                label="Nouvelle tâche"
                type="text"
                id="newTask"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={(e) => {
                    if(e.key === "Enter" && taskName.trim() !== "") {
                        HandleCreateTask(taskList?.id as string);
                        setTaskName("");
                    }
                }}
                />
                <Typography variant="body2">
                    {tasks.length >0 ?(
                        <List>
                            {tasks.map((task) => (
                                <ListItem key={task.id}>
                                    <ListItemText primary={task.name} />
                                </ListItem>
                            ))}
                        </List>
                    ):(
                        <Typography variant="body1">Aucune tâche à faire</Typography>
                    )}
                </Typography>
            </CardContent>
        </React.Fragment>
    )

    return(
        <Box>
            <Card variant="outlined">{card}</Card>
        </Box>
    )


}

export default Tasks;