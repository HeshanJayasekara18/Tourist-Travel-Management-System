import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventNavBar from './pages/Admin/event-manage/eventnavbar/EventNavBar';
import UserDetailNav from './common/user-detail-nav/UserDetailNav';
import AddEvent from './pages/Admin/event-manage/addevents/AddEvent'; 




function App() {
  return (
    <>
    <EventNavBar />
   
    <AddEvent />
    
  
    
   
    </>
  );
}

export default App;
