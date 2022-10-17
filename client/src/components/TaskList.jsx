import { useState } from "react";
import { useEffect } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom';

export const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()

  const loadTasks = async () => {
    const response = await fetch("http://localhost:4000/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1> Task List </h1>
      {tasks.map((task) => (
        <Card
          style={{
            marginTop: "10px",
            marginBotton: ".7rem",
            backgroundColor: "#1e272e",
            color: "white",
          }}
          key={task.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>

            <div>
              <Button variant="contained" onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(task.id)}
                style={{ marginLeft: ".8rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
