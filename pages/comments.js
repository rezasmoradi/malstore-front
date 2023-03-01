import React from "react";
import UserPanelDrawer from "../components/UserPanelDrawer";
import UserHeader from '../components/UserHeader';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from '../components/Table';
import TextField from '../components/TextField';

function Comments() {

    return (
        <div className="w-full h-full flex dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={false} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all overflow-hidden">
                <UserHeader />
                <div className="w-full h-auto">
                    <div className="w-full h-auto sm:h-16 flex flex-row justify-center items-center my-2">
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
                                            <span className="text-primary inline-block mx-auto px-0.5">نام کاربر</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">نام محصول</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">متن دیدگاه</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">وضعیت دیدگاه</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">تاریخ ثبت</span>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell className={'md:max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap'}>فرزاد حسینی</TableCell>
                                        <TableCell className={'md:max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap'}>زودپز</TableCell>
                                        <TableCell className={'max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</TableCell>
                                        <TableCell>تأیید نشده</TableCell>
                                        <TableCell>1401/10/28</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell className={'md:max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap'}>فرزاد حسینی</TableCell>
                                        <TableCell className={'md:max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap'}>زودپز</TableCell>
                                        <TableCell className={'max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</TableCell>
                                        <TableCell>تأیید شده</TableCell>
                                        <TableCell>1401/10/21</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell className={'md:max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap'}>فرزاد حسینی</TableCell>
                                        <TableCell className={'md:max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap'}>زودپز</TableCell>
                                        <TableCell className={'max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</TableCell>
                                        <TableCell>تأیید شده</TableCell>
                                        <TableCell>1401/10/21</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base'}>
                                        <TableCell>1</TableCell>
                                        <TableCell className={'md:max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap'}>فرزاد حسینی</TableCell>
                                        <TableCell className={'md:max-w-[5rem] overflow-hidden text-ellipsis whitespace-nowrap'}>زودپز</TableCell>
                                        <TableCell className={'max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.</TableCell>
                                        <TableCell>تأیید شده</TableCell>
                                        <TableCell>1401/10/21</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;