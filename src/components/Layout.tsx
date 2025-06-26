import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

export function Layout({ children }) {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FoodLens
            </Typography>
            <Button color="inherit" href="/">
              Home
            </Button>
            <Button color="inherit" href="/tracker">
              Tracker
            </Button>
            <Button color="inherit" href="/recognition">
              Recognition
            </Button>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}
