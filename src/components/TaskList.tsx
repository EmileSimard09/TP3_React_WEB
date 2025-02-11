import {
  Box,
  Button,
  CardActions,
  CardContent,
  Typography,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  List,
  ListItemText,
  ListItemButton,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import TaskListDS from "../data_services/TaskListDS";
import ITaskList from "../data_interfaces/ITaskList";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Tooltip from "@mui/material/Tooltip";

type TaskListProps = {
  setTaskIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTaskList: React.Dispatch<React.SetStateAction<ITaskList | null>>;
};

function TaskList({ setTaskIsOpen, setSelectedTaskList }: TaskListProps) {
  const [open, setOpen] = React.useState(false);
  const [newListName, setNewListName] = React.useState("");
  const [taskLists, setTaskLists] = React.useState<ITaskList[]>([]);

  useEffect(() => {
    TaskListDS.getAll().then((taskListsPrise) => {
      setTaskLists(taskListsPrise);
    });
  }, []);

  const HandleTaskListClick = (taskList: ITaskList) => {
    setSelectedTaskList(taskList);
    setTaskIsOpen(true);
  };

  const HandleOpenDialog = () => {
    setOpen(true);
  };

  const handleDelete = (event: React.MouseEvent, tasklist: ITaskList) => {
    event.stopPropagation();

    TaskListDS.remove(tasklist).then((taskListsPrise) => {
      setTaskLists(taskListsPrise);
    });
    setTaskIsOpen(false);
  };

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };

  const HandleCloseDialog = () => {
    setOpen(false);
    setNewListName("");
  };

  const HandleCreateList = () => {
    console.log("Créer une nouvelle liste avec le nom: ", newListName);
    const id: string = uuid();
    TaskListDS.create({ id, name: newListName, tasks: [] });
    TaskListDS.getAll().then((taskListsPrise) => {
      setTaskLists(taskListsPrise);
    });
    HandleCloseDialog();
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          variant="h5"
          align="center"
          component="div"
          sx={{
            color: "#1976D2", // Directly set light blue color
          }}
        >
          Liste de tâches
        </Typography>
        <Typography align="center" variant="body2">
          {taskLists.length > 0 ? (
            <List>
              {taskLists.map((lestask) => (
                <ListItemButton
                  key={lestask.id}
                  onClick={() => HandleTaskListClick(lestask)}
                >
                  <ListItemText primary={lestask.name} />
                  <Tooltip title="Supprimer la liste">
                    <IconButton
                      edge="end"
                      onClick={(event) => handleDelete(event, lestask)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography align="center" variant="body2" color="textSecondary">
              Aucune liste de tâches
            </Typography>
          )}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          onClick={HandleOpenDialog}
          startIcon={<PlaylistAddIcon />}
        >
          Nouvelle Liste
        </Button>
      </CardActions>
      <Dialog open={open} onClose={HandleCloseDialog}>
        <DialogTitle>Nouvelle Liste</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="listName"
            label="Nom de la liste"
            type="text"
            fullWidth
            variant="standard"
            value={newListName}
            onChange={HandleChange}
            required
            error={newListName === ""}
            helperText={
              newListName === "" ? "Le nom de la liste est requis" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleCloseDialog}>Annuler</Button>
          <Button
            onClick={HandleCreateList}
            disabled={newListName.trim() === ""}
          >
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default TaskList;
