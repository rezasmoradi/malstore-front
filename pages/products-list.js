import React from "react";
import UserPanelDrawer from "../components/UserPanelDrawer";
import UserHeader from '../components/UserHeader';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TablePagination } from '../components/Table';
import TextField from '../components/TextField';

function ProductsList() {
    
    return (
        <div className="w-full h-full flex dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={false} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all overflow-hidden">
                <UserHeader />
                <div className="w-full h-auto">
                    <div className="w-full h-auto sm:h-16 flex flex-col sm:flex-row justify-around items-center my-2">
                        <button className="w-auto h-9 md:h-10 mt-3 px-3 py-2 bg-transparent flex flex-row justify-around items-center text-gray-800 dark:text-gray-300 border border-primary rounded outline-none">
                            <span className="px-1 text-sm md:text-base">ثبت محصول جدید</span>
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
                                            <span className="text-primary inline-block mx-auto px-0.5">دسته</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">نام</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">مدل</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">ابعاد (cm)</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">توضیحات</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">وزن (گرم)</span>
                                        </TableCell>
                                        <TableCell component="th">
                                            <span className="text-primary inline-block mx-auto px-0.5">تاریخ ثبت</span>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم خانگی</TableCell>
                                        <TableCell>زودپز چند کاره</TableCell>
                                        <TableCell>ZNG</TableCell>
                                        <TableCell>27*8*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/24</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم خانگی</TableCell>
                                        <TableCell>زودپز</TableCell>
                                        <TableCell>ZNG</TableCell>
                                        <TableCell>27*8*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم خانگی</TableCell>
                                        <TableCell>زودپز چند کاره</TableCell>
                                        <TableCell>ZNG</TableCell>
                                        <TableCell>27*8*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم خانگی</TableCell>
                                        <TableCell>زودپز چند کاره</TableCell>
                                        <TableCell>QWT</TableCell>
                                        <TableCell>27*10*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/18</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم خانگی</TableCell>
                                        <TableCell>زودپز چند کاره</TableCell>
                                        <TableCell>QWT</TableCell>
                                        <TableCell>27*8*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم خانگی</TableCell>
                                        <TableCell>زودپز چند کاره</TableCell>
                                        <TableCell>EQM</TableCell>
                                        <TableCell>27*8*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/22</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم آشپزخانه</TableCell>
                                        <TableCell>زودپز چند کاره</TableCell>
                                        <TableCell>QWT</TableCell>
                                        <TableCell>27*10*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base border-b mx-auto border-slate-300'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم آشپزخانه</TableCell>
                                        <TableCell>زودپز چند کاره</TableCell>
                                        <TableCell>QWT</TableCell>
                                        <TableCell>27*8*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/17</TableCell>
                                    </TableRow>
                                    <TableRow className={'text-center text-sm lg:text-base'}>
                                        <TableCell>1</TableCell>
                                        <TableCell>لوازم آشپزخانه</TableCell>
                                        <TableCell>زودپز</TableCell>
                                        <TableCell>EQM</TableCell>
                                        <TableCell>27*8*12</TableCell>
                                        <TableCell className={'max-w-[12rem] whitespace-nowrap text-sm overflow-hidden text-ellipsis'}>چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</TableCell>
                                        <TableCell>2.300</TableCell>
                                        <TableCell>1401/10/07</TableCell>
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

export default ProductsList;