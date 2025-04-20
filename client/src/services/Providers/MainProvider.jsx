import React from 'react';
import Header from "../../components/Header.jsx";

const MainProvider = ({children}) => {
    return (
        <div className={'root_full_page'}>
            <Header/>
            <main className={'root_main px-3 px-lg-5'}>
                {children}
            </main>
        </div>
    );
};

export default MainProvider;