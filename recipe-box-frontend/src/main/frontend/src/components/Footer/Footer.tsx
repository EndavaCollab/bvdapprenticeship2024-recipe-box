import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
    // Get the current year
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>
                <span className="copy-symbol">&copy;
                </span> {currentYear} <span className="bold-small">
                ENDAVA</span>
            </p>
        </footer>
    );
}

export default Footer;
