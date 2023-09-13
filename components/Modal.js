import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

function Modal({ title, onClose = null, fullHeight = false, children, className = '', open = false }) {

    const modalRef = useRef();

    useEffect(() => {
        const body = document.body;
        [
            'before:w-full', 'before:h-full', 'before:hidden', 'before:absolute',
            'before:opacity-60', 'before:content-[""]', 'before:blur'
        ].map(cls => { body.classList.add(cls); });
    }, []);

    useEffect(() => {
        open ? openModal() : closeModal();
    }, [open]);

    const openModal = () => {
        document.body.classList.remove('before:hidden');
        document.body.classList.add('pointer-events-none');;
        modalRef.current.classList.remove('top-full');
        modalRef.current.classList.add('top-5');
        modalRef.current.classList.add('z-50');
        modalRef.current.focus()
    };

    const closeModal = () => {
        document.body.classList.remove('pointer-events-none');
        document.body.classList.add('before:hidden');
        modalRef.current.classList.remove('top-5');
        modalRef.current.classList.add('top-full');
        modalRef.current.classList.remove('z-50');
        if (typeof onClose === 'function') onClose();
    };

    const blurModal = useCallback((e) => {
        if (!modalRef.current || modalRef.current.contains(e.target)) return
        closeModal()
    }, [closeModal, modalRef])

    return (
        <div ref={modalRef} tabIndex={1} style={{ height: fullHeight ? '100%' : 'auto' }} onBlur={blurModal} className={`overflow-y-auto overflow-x-hidden pointer-events-auto bg-slate-100 dark:bg-slate-800 border shadow-lg w-full max-w-screen-sm backdrop-blur ${fullHeight ? 'rounded-tl-xl rounded-tr-xl' : 'rounded'} fixed left-0 right-0 mx-auto top-full transition-all duration-300 bg-white outline-none pb-2 ${className}`}>
            <div className="w-full h-8 mr-4 flex flex-row items-center my-2 p-2">
                <div onClick={closeModal} className="absolute text-gray-800 dark:text-white right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <p className="w-full text-base font-bold text-center text-gray-800 dark:text-gray-300">{title}</p>
            </div>
            {children}
        </div>
    );
}

export default Modal;