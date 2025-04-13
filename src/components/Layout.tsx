import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <header>
            <Navbar />
            </header>
            <main>{children}</main>
            <footer>
                {/* Footer content can be added here */}
            </footer>
        </div>
    );
};

export default Layout;