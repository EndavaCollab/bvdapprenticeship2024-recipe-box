import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './LayoutWithHeaderMainFooter.css';
import {Outlet} from "react-router-dom";

function Layout(){

    return (
        <div className="layout-container">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
