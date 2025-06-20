import React from 'react';

const base = 'px-4 py-2 rounded font-semibold';
const variants = {
  primary: `${base} bg-blue-500 text-white hover:bg-blue-600`,
  secondary: `${base} bg-gray-300 text-black hover:bg-gray-400`,
  danger: `${base} bg-red-500 text-white hover:bg-red-600`
};

const Button = ({ children, variant = 'primary', ...props }) => (
  <button className={variants[variant]} {...props}>{children}</button>
);

export default Button;
