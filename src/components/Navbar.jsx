import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between">
    <div className="font-bold">Task Manager</div>
    <div className="space-x-4">
      <Link to="/">Home</Link>
      <Link to="/tasks">Tasks</Link>
    </div>
  </nav>
);

export default Navbar;
