import React from 'react';
const Footer = () => (
  <footer className="bg-gray-100 text-center py-4 dark:bg-gray-900 dark:text-white">
    © {new Date().getFullYear()} Task Manager. All rights reserved.
  </footer>
);
export default Footer;
