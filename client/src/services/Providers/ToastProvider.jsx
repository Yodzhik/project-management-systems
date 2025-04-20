import React from 'react';
import {ToastContainer} from "react-toastify";

const ToastProvider = ({children}) => {
    return (
        <>
            {children}
            <ToastContainer
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
            />
        </>
    );
};

export default ToastProvider;