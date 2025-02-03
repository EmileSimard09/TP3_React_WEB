import { Box, Button, CardActions, CardContent, Typography, Card, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import React from "react";

function TaskList(){

    const [open, setOpen] = React.useState(false);
    const [newListName, setNewListName] = React.useState("");

    const HandleOpenDialog = () => {
        setOpen(true);
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
        HandleCloseDialog();
    };

    const card = (
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" align="center" component="div">
                Liste de tâches
            </Typography>
            <Typography align="center" variant="body2">
                La liste va la
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
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={HandleCloseDialog}>Annuler</Button>
                <Button onClick={HandleCreateList}>Créer</Button>
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