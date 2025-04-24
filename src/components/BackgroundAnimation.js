import React from 'react';

const BackgroundAnimation = () => (
  <div className="background-animation w-full h-full">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 800" 
      className="w-full h-full"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        opacity: 0.3
      }}
    >
      <style>
        {`
          @keyframes drawLine {
            0% {
              stroke-dashoffset: 1000;
              opacity: 0;
            }
            40% {
              opacity: 1;
            }
            100% {
              stroke-dashoffset: 0;
              opacity: 0.7;
            }
          }
          
          .path1 { stroke: #4cc3ff; animation-delay: 0s; }
          .path2 { stroke: #4cffa1; animation-delay: 1s; }
          .path3 { stroke: #ff4ca6; animation-delay: 2s; }
          
          .animated-path {
            stroke-width: 2;
            fill: none;
            stroke-dasharray: 1000;
            animation: drawLine 4s ease-out infinite;
          }
        `}
      </style>
      
      <path 
        className="animated-path path1"
        d="M100,100 C200,100 300,200 400,200 S600,300 700,300"
      />
      <path 
        className="animated-path path2"
        d="M100,400 C250,400 250,200 400,200 S550,400 700,400"
      />
      <path 
        className="animated-path path3"
        d="M100,600 C200,600 300,500 400,500 S600,600 700,600"
      />
      
      {/* Circuit-like decorative elements */}
      <circle cx="100" cy="100" r="5" fill="#4cc3ff" />
      <circle cx="400" cy="200" r="5" fill="#4cc3ff" />
      <circle cx="700" cy="300" r="5" fill="#4cc3ff" />
      
      <circle cx="100" cy="400" r="5" fill="#4cffa1" />
      <circle cx="400" cy="200" r="5" fill="#4cffa1" />
      <circle cx="700" cy="400" r="5" fill="#4cffa1" />
      
      <circle cx="100" cy="600" r="5" fill="#ff4ca6" />
      <circle cx="400" cy="500" r="5" fill="#ff4ca6" />
      <circle cx="700" cy="600" r="5" fill="#ff4ca6" />
    </svg>
  </div>
);

export default BackgroundAnimation;