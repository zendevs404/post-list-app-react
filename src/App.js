// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Banner from './components/Banner';
import PostList from './components/PostList';

function App() {
  return (
    <Router>
      <Header />
      <Banner />
      <Routes>
        <Route path="/" element={<PostList />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
