import { Container, Grid2 } from "@mui/material";

function Dashboard() {
  return (
    <Container sx={{ marginY: 3 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 5, lg: 4 }}>
          À FAIRE: Créer un composant qui affiche les liste de tâches.
        </Grid2>
        <Grid2 size={{ xs: 12, md: 7, lg: 8 }}>
          À FAIRE: Créer un composant qui affiche les tâches à faire et les
          tâches complétées de la liste sélectionnée.
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Dashboard;
