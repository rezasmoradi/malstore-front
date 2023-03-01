import React, { useRef, useState } from "react";
import UserHeader from '../components/UserHeader';
import UserPanelDrawer from "../components/UserPanelDrawer";
import TextField from "../components/TextField";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "../components/Table";
import Modal from '../components/Modal';

function Users() {

    const [open, setOpen] = useState(false);
    const submitAlertRef = useRef();

    const submit = () => {
        submitAlertRef.current.classList.add('animate-slideFromLeft');
        submitAlertRef.current.style.right = '32px'
        setTimeout(() => {
            submitAlertRef.current.style.right = '-100%';
            submitAlertRef.current.classList.remove('animate-slideFromLeft')
        }, 4000);
    };

    return (
        <div className="w-full h-full flex dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={false} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all overflow-hidden">
                <UserHeader />
                <Modal open={open} onClose={() => { setOpen(false); }}>
                    <div className="w-10/12 h-auto mb-8 mx-auto">
                        <form method="post" encType="multipart/form-data">
                            <div className="my-4">
                                <TextField label="نام" value="اثمم" required />
                            </div>
                            <div className="my-4">
                                <TextField label="نام خانوادگی" required />
                            </div>
                            <div className="my-4">
                                <TextField label="ایمیل" required />
                            </div>
                            <div className="my-4">
                                <TextField label="نام کاربری" />
                            </div>
                            <div className="my-4">
                                <TextField accept={'image/jpg, image/png, image/jpeg'} label="انتخاب تصویر" type="file" />
                            </div>
                            <div className="w-full flex justify-center items-center">
                                <button type="button" onClick={submit} className="w-full md:w-40 h-10 mt-8 md:ml-6 mx-auto lg:ml-0 backdrop-blur-2xl outline-none bg-primary dark:bg-primary/75 border dark:border-slate-600 rounded md:dark:shadow-slate-700/20 md:shadow-[0_2px_4px_rgba(0,0,0,0.1)] py-1 px-4 text-white dark:text-gray-300 text-semi-small font-medium md:mx-2 md:before:content-[''] md:before:w-0 md:before:h-0 md:hover:before:w-40 md:hover:before:h-10 md:before:duration-300 md:before:rounded md:before:transition-all before:absolute before:bottom-0 before:left-0 md:hover:before:bg-white before:-z-10 md:hover:border-primary md:hover:text-primary dark:hover:before:bg-slate-800/10">
                                    ثبت&zwnj;نام
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <div className="w-full h-auto">
                    <div className="w-full h-auto sm:h-16 flex flex-col sm:flex-row justify-around items-center my-2">
                        <button className="w-auto h-9 md:h-10 mt-3 px-3 py-2 bg-transparent flex flex-row justify-around items-center text-gray-800 dark:text-gray-300 border border-primary rounded outline-none" onClick={() => { setOpen(!open); }}>
                            <span className="px-1 text-sm md:text-base">ثبت کاربر جدید</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 md:w-6 h-5 md:h-6">
                                <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className="w-11/12 sm:w-96 h-auto">
                            <TextField value={''} label={'جستجو'} type={'text'} />
                        </div>
                    </div>
                    <div className="w-[98%] h-auto mx-auto border rounded">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow className={'text-center h-12 text-sm border-b-2 border-slate-300 dark:border-slate-200'}>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">ردیف</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">نام</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">نام خانوادگی</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">ایمیل</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">نام کاربری</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">تصویر</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">تاریخ ثبت&zwnj;نام</span>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>فرزاد</TableCell>
                                        <TableCell>حسینی</TableCell>
                                        <TableCell className={'msm:max-w-[10rem] msm:overflow-hidden'}>farzad.hoseini@yahoo.com</TableCell>
                                        <TableCell>farzad_hoseini</TableCell>
                                        <TableCell><img src="./assets/images/user.png" width={32} height={32} className='mx-auto' /></TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination />
                    </div>
                </div>
                <div ref={submitAlertRef} style={{ right: '-100%' }} className="w-56 h-16 absolute bottom-16 bg-primary rounded grid justify-center content-center">
                    <p className="w-full h-full text-gray-100">کاربر با موفقیت ثبت شد</p>
                    <span className="absolute right-1 top-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Users;