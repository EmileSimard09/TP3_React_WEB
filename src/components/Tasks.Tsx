import {
  Box,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import ITaskList from "../data_interfaces/ITaskList";
import { v4 as uuid } from "uuid";
import ITask from "../data_interfaces/ITask";
import TaskDS from "../data_services/TaskDS";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Tooltip from "@mui/material/Tooltip";

type TasksProps = {
  taskList: ITaskList | null;
};

function Tasks({ taskList }: TasksProps) {
  const [taskName, setTaskName] = React.useState("");
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const [tasksDone, setTasksDone] = React.useState<ITask[]>([]);

  const handleDelete = (task: ITask) => {
    TaskDS.remove(taskList?.id as string, task);

    //Probalement une meilleure façon de faire qui utilise mieux les hooks
    TaskDS.getAll(taskList?.id as string).then((tasks) => {
      const completed = tasks.filter((task: ITask) => task.completed);
      const incomplete = tasks.filter((task: ITask) => !task.completed);

      setTasksDone(completed);
      setTasks(incomplete);
    });
  };

  const handleStarCheck = (task: ITask) => {
    if (task.important) {
      task.important = false;
    } else {
      task.important = true;
    }

    TaskDS.update(taskList?.id as string, task);

    TaskDS.getAll(taskList?.id as string).then((tasks) => {
      const completed = tasks.filter((task: ITask) => task.completed);
      const incomplete = tasks.filter((task: ITask) => !task.completed);

      setTasksDone(completed);
      setTasks(incomplete);
    });
  };

  const handleCheckBoxCheck = (task: ITask) => {
    if (task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }

    TaskDS.update(taskList?.id as string, task);

    TaskDS.getAll(taskList?.id as string).then((tasks) => {
      const completed = tasks.filter((task: ITask) => task.completed);
      const incomplete = tasks.filter((task: ITask) => !task.completed);

      setTasksDone(completed);
      setTasks(incomplete);
    });
  };

  useEffect(() => {
    if (taskList?.id) {
      TaskDS.getAll(taskList.id).then((tasks) => {
        const completed = tasks.filter((task: ITask) => task.completed);
        const incomplete = tasks.filter((task: ITask) => !task.completed);

        setTasksDone(completed);
        setTasks(incomplete);
      });
    }
  }, [taskList?.id]);

  const HandleCreateTask = (taskListId: string) => {
    const id: string = uuid();
    const laTask: ITask = {
      id: id,
      name: taskName,
      important: false,
      completed: false,
    };
    TaskDS.create(taskListId, laTask);
    TaskDS.getAll(taskList?.id as string).then((tasks) => {
      const completed = tasks.filter((task: ITask) => task.completed);
      const incomplete = tasks.filter((task: ITask) => !task.completed);

      setTasksDone(completed);
      setTasks(incomplete);
    });
  };
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: "#9C27B0" }}>
          {taskList?.name}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: "#9C27B0" }}>
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
            if (e.key === "Enter" && taskName.trim() !== "") {
              HandleCreateTask(taskList?.id as string);
              setTaskName("");
            }
          }}
        />
        <Typography variant="body2">
          {tasks.length > 0 ? (
            <List>
              {tasks.map((task) => (
                <Paper
                  elevation={1}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    marginBottom: 2,
                  }}
                >
                  <ListItem key={task.id}>
                    <Checkbox onChange={() => handleCheckBoxCheck(task)} />
                    <ListItemText primary={task.name} />
                    <Tooltip
                      title={
                        task.important
                          ? "Retirer important"
                          : "Marquer important"
                      }
                    >
                      <IconButton
                        onClick={() => handleStarCheck(task)}
                        edge="end"
                        sx={{ color: task.important ? "gold" : "grey.500" }}
                      >
                        {task.important ? <StarIcon /> : <StarBorderIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer la tâche">
                      <IconButton onClick={() => handleDelete(task)} edge="end">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="gray">
              Aucune tâche à faire
            </Typography>
          )}
        </Typography>
        <Typography variant="h6" component="div" sx={{ color: "#9C27B0" }}>
          Tâches complétées
        </Typography>

        <Typography variant="body2">
          {tasksDone.length > 0 ? (
            <List>
              {tasksDone.map((taskfFait) => (
                <Paper
                  elevation={3}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    marginBottom: 2,
                  }}
                >
                  <ListItem key={taskfFait.id}>
                    <Checkbox
                      onChange={() => handleCheckBoxCheck(taskfFait)}
                      checked={true}
                    />
                    <ListItemText
                      primary={taskfFait.name}
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    />
                    <Tooltip
                      title={
                        taskfFait.important
                          ? "Retirer important"
                          : "Marquer important"
                      }
                    >
                      <IconButton
                        onClick={() => handleStarCheck(taskfFait)}
                        edge="end"
                        sx={{
                          color: taskfFait.important ? "gold" : "grey.500",
                        }}
                      >
                        {taskfFait.important ? (
                          <StarIcon />
                        ) : (
                          <StarBorderIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Supprimer la tâche">
                      <IconButton
                        onClick={() => handleDelete(taskfFait)}
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography color="gray" variant="body1">
              Aucune tâche complétée
            </Typography>
          )}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default Tasks;
