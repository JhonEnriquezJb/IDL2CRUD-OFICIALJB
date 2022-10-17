import React from "react";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: "none", color: "#eee" }}>
                  PERN STACK
                </Link>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/tasks/new")}
              >
                NEW TASK
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
};
