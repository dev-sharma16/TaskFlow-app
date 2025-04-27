import React from "react";

function Logo({ width = '100px', height = 'auto', className = '' }) {
    return (
        <div 
            className={`logo-container ${className}`} 
            style={{
                width, 
                height, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: 'rgba(255, 255, 255, 0.6)', // Light background
                borderRadius: '100px', // Rounded corners for a softer look
                padding: '5px', // Adds padding around the logo
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' // Subtle shadow to make it pop
            }}
        >
            <img 
                src="src/assets/taskFlowLogo.png" 
                alt="Logo" 
                style={{
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain' // Ensures logo maintains its aspect ratio
                }} 
            />
        </div>
    );
}

export default Logo;