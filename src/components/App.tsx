import { Box } from "@mui/material";
import Banner from "./Banner";
import Dashboard from "./Dashboard";
import React from "react";

function App() {
  const [taskIsOpen, setTaskIsOpen] = React.useState(false);


  return (
    <Box>
      <Banner />
      <Dashboard taskIsOpen={taskIsOpen} setTaskIsOpen={setTaskIsOpen} />
    </Box>
  );
}

export default App;
