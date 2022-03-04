import './App.css';
import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Leftside } from './Leftside'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App(props) {
  const [profile, setProfile] = useState()
  
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Leftside/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
