
import './App.css';
import { Container, Typography } from '@mui/material';
import Contact from './components/Contact';

function App() {
  return (
    <Container maxWidth="md"> 
      <Typography 
          mt={5} mb={5}
          variant="h5" 
          align="center"
          color="primary"> 
          Topo Contact App       
      </Typography>
      
      <Contact />
    </Container> 
  );
}

export default App;
