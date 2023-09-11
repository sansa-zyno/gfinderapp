import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route,Routes,useNavigate } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;

/*import { Container, Row, Col } from "reactstrap";

import Post from "./test/Post";
import Header from "./test/Header";
import SideCard from "./test/SideCard";

const App = () => (
  <>
    <Header />

    <main className="my-5 py-5">
      <Container className="px-0">
        <Row
          noGutters
          className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative"
        >
          <Col
            xs={{ order: 2 }}
            md={{ size: 4, order: 1 }}
            tag="aside"
            className="pb-5 mb-5 pb-md-0 mb-md-0 mx-auto mx-md-0"
          >
            <SideCard />
          </Col>

          <Col
            xs={{ order: 1 }}
            md={{ size: 7, offset: 1 }}
            tag="section"
            className="py-5 mb-5 py-md-0 mb-md-0"
          >
            <Post />
          </Col>
        </Row>
      </Container>
    </main>
  </>
);

export default App;*/
