import { Task } from "@mui/icons-material";
import { Box, Button, CardActions, CardContent, Typography, Card, Dialog, DialogTitle, DialogContent, TextField, DialogActions, List, ListItem, ListItemText, ListItemButton, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import TaskListDS from "../data_services/TaskListDS";
import ITaskList from "../data_interfaces/ITaskList";
import DeleteIcon from '@mui/icons-material/Delete';


function TaskList(){

    const [open, setOpen] = React.useState(false);
    const [newListName, setNewListName] = React.useState("");
    const [taskLists, setTaskLists] = React.useState<ITaskList[]>([]);
    
    useEffect(() => {
      TaskListDS.getAll().then(taskListsPrise => {
        setTaskLists(taskListsPrise);
      });}, []);

    const HandleOpenDialog = () => {
        setOpen(true);
    };

    const handleDelete = (event: React.MouseEvent,tasklist:ITaskList) => {
      event.stopPropagation();

      TaskListDS.remove(tasklist).then(taskListsPrise => {
        setTaskLists(taskListsPrise);
      });
    };

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewListName(e.target.value);
    }

    const HandleCloseDialog = () => {
        setOpen(false);
        setNewListName("");
    };

    const HandleCreateList = () => {
        console.log("Créer une nouvelle liste avec le nom: ", newListName);
        const id: string = uuid();
        TaskListDS.create({ id, name: newListName, tasks: [] });
        TaskListDS.getAll().then(taskListsPrise => {
          setTaskLists(taskListsPrise);});
        HandleCloseDialog();
    };

    const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" align="center" component="div">
                Liste de tâches
            </Typography>
            <Typography align="center" variant="body2">
              {taskLists.length > 0 ?(
                <List>
                  {taskLists.map((lestask) => (
                    <ListItemButton key={lestask.id}>
                      <ListItemText primary={lestask.name} />
                      <IconButton edge="end" onClick={(event) => handleDelete(event, lestask)} >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemButton>
                  ))}
                </List>
              ) : (
                <Typography align="center" variant="body2">
                Aucune liste de tâches
              </Typography>
              )}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button onClick={HandleOpenDialog}size="medium">Nouvelle Liste</Button>
          </CardActions>
          <Dialog
          open={open}
          onClose={HandleCloseDialog}
          >
            <DialogTitle>Créer un nouvelle catégorie</DialogTitle>
            <DialogContent >
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
                    helperText={newListName === "" ? "Le nom de la liste est requis" : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={HandleCloseDialog}>Annuler</Button>
                <Button onClick={HandleCreateList} disabled={newListName.trim() === ""}>Créer</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
      
    return (
    <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
    )
}

export default TaskList;