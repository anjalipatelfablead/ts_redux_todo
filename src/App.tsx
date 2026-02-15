import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import Login from './components/user/login';
import Register from './components/user/register';
import TaskList from './components/task/tasklist';

function App() {
  const { token } = useSelector((state: RootState) => state.user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Protected Task List Route */}
          <Route
            path="/tasks"
            element={token ? <TaskList /> : <Navigate to="/login" replace />}
          />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Default Route - Redirect based on auth status */}
          <Route
            path="/"
            element={token ? <Navigate to="/tasks" replace /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
