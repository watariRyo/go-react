import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./pages/users/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";
import Roles from "./pages/roles/Roles";
import RoleCreate from "./pages/roles/RoleCreate";
import RoleEdit from "./pages/roles/RoleEdit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/create" element={<UserCreate />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/roles/create" element={<RoleCreate />} />
          <Route path="/roles/edit/:id" element={<RoleEdit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
