import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/user/login';
import Register from './components/user/register';
import TaskList from './components/task/tasklist';
import AddTask from './components/task/addtask';
import NotFound from './components/pages/notFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<TaskList />} />
          <Route path="/task/add" element={<AddTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
