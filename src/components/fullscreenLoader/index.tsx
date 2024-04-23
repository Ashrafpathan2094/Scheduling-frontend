import React from 'react';
import './index.css';
const FullScreenLoader = () => {
  return (
    <div className="loading">
      <div
        className="uil-ring-css"
        //  style='transform:scale(0.79);'
      >
        <div></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
