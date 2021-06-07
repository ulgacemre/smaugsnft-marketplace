import React from 'react';
import logo from '../assets/images/logo.png'
import betaLogo from '../assets/images/logo-beta.png'




function Logo({ className }) {
    return (
        <div className={className}>
            <img
                alt=""
                src={betaLogo}
                width="130"
                height="auto"
                className="d-block align-center"
            />
        </div>
    );
}

export default Logo;
