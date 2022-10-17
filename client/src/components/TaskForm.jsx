import {
  Grid,
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom'


export const TaskForm = () => {

  const [task, setTask] = useState({
    title: '',
    description: '',
  });
  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(task);

    const res = await fetch('http://localhost:4000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {'Content-Type': 'application/json' }
    })
    const data = await res.json()
    console.log(data);


    navigate('/')
  };

  const handleChange = e => {
    setTask({...task, [e.target.name]: e.target.value});

    const loadTask = async () => {
     const res = await fetch(`http://localhost:4000/tasks/${params.id}`)
      const data = await res.json()
      setTask({title: data.title, description: data.description})
    }
    
    useEffect(() => {
      if (params.id) {
        loadTask(params.id);
      }
    }, [params.id])
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Card
            sx={{ mt: 5 }}
            style={{
              backgroundColor: "#16389e",
              padding: "1rem",
            }}
          >
            <Typography variant="5" textAlign="center" color="white">
              Create task
            </Typography>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  variant="filled"
                  label="Escribe tu titulo"
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}
                  
                  name= 'title'
                  value={task.title}
                  onChange={handleChange}
                  InputProps={{ style: { color: "white" } }}
                  InputLavelProps={{ style: { color: "white" } }}
                />

                <TextField
                  variant="filled"
                  label="Escribe tu descripcion"
                  multiline
                  rows={4}
                  sx={{
                    display: "block",
                    margin: ".5rem 0",
                  }}

                  name= 'description'
                  value={task.description}
                  onChange={handleChange}
                  inputProps={{ style: { color: "white" } }}
                  InputLavelProps={{ style: { color: "white" } }}
                />

                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
