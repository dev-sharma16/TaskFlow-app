import React from "react";

function Logo({ width = '100px', height = 'auto', className = '' }) {
    return (
        <div className={`logo-container ${className}`} style={{ width, height }}>
            <img src="src/assets/taskFlowLogo.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default Logo;