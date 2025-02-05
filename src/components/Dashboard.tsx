import { Container, Grid2 } from "@mui/material";
import TaskList from "./TaskList";
import Tasks from "./Tasks";
import ITaskList from "../data_interfaces/ITaskList";
import React from "react";

type DashboardProps = {
  taskIsOpen: boolean;
  setTaskIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Dashboard({ taskIsOpen, setTaskIsOpen }: DashboardProps) {

  const [selectedTaskList, setSelectedTaskList] = React.useState<ITaskList | null>(null);

  return (
    <Container sx={{ marginY: 3 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 5, lg: 4 }}>
          <TaskList setSelectedTaskList={setSelectedTaskList} setTaskIsOpen={setTaskIsOpen} />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7, lg: 8 }}>
          {taskIsOpen && (<Tasks taskList={selectedTaskList} />)}
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Dashboard;
