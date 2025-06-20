import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">{children}</main>
    <Footer />
  </div>
);
export default Layout;
