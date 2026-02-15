import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/user/login';
import Register from './components/user/register';
import TaskList from './components/task/tasklist';
import AddTask from './components/task/addtask';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<TaskList />} />
          <Route path="/task/add" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
