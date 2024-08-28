import React from 'react';
import logo from '../assets/logo4.png'; // Adjust the path based on your folder structure
import styles from './Logo.module.css'; // Import the CSS module

function Logo({ width = '120px', height = '70px' }) {
  return (
    <div className="flex justify-center items-center p-2">
      <div
        className="relative overflow-hidden group"
        style={{ width, height }}
      >
        <img
          src={logo}
          alt="Logo"
          className="rounded-lg w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 rounded-lg border-4 border-transparent ${styles.animateBorderTransition}`}
          style={{
            borderImage: 'linear-gradient(45deg, rgba(66, 153, 225, 0.7), rgba(66, 153, 225, 0.3))',
            borderImageSlice: 1,
            transform: 'scale(1.1)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}

export default Logo;
