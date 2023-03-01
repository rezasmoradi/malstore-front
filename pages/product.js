/* import React from "react";

import {
    Box, Breadcrumbs, Button, Card, FormControl, FormControlLabel, IconButton, Link,
    Table, TableContainer, TableHead, TableBody, TableCell, TableRow,
    List, ListItem, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, Rating, Typography
} from "@mui/material";
import Image from "next/image";
import {
    CheckIcon, ChevronLeftIcon, HeartIcon, MinusSmIcon, PresentationChartLineIcon,
    SearchCircleIcon, ShareIcon, ShoppingCartIcon, InformationCircleIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from '@heroicons/react/solid';
import { makeStyles } from "@mui/styles";

import Header from '../components/Header';
import Footer from '../components/Footer';
import Comment from "../components/Comment";


const useStyles = makeStyles(() => ({
    rating: {
        '& label span svg.css-1vooibu-MuiSvgIcon-root': {
            width: '1.5em',
            height: '1.5em',
            color: 'rgb(250 204 21)',
        }
    },
    itemTextSmall: {
        '& span': {
            fontSize: 14
        }
    }
}));


function Product() {

    const classes = useStyles();
    const [tab, setTab] = React.useState(0);

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" display={'flex'} fontSize={14} onClick={() => { console.log('RAFT'); }}>
            <HomeIcon className="w-4 h-4" />
            <span>مال استور</span>
        </Link>,
        <Link
            underline="hover"
            key="2"
            fontSize={14}
            color="inherit"
            href="/material-ui/getting-started/installation/"
            onClick={() => { console.log('OOMAD'); }}
        >
            کالای خواب
        </Link>,
        <Typography key="3" color="text.primary" fontSize={14}>
            روتختی
        </Typography>,
    ];

    const category = [
        <Link
            underline="none"
            key="2"
            sx={{ fontSize: 14, fontWeight: 500, color: 'rgb(147 51 234)' }}
            href="/material-ui/getting-started/installation/"
            onClick={() => { console.log('OOMAD'); }}
        >
            ژاکارد
        </Link>,
        <Link underline="none" key="3" sx={{ fontSize: 14, fontWeight: 500, color: 'rgb(147 51 234)' }}>
            روتختی کریستال
        </Link>,
    ];

    const tabs = [
        <Link
            href="#description"
            underline="none"
            onClick={() => setTab(0)}
            sx={{
                height: '100%',
                fontSize: 14,
                fontWeight: 500,
                color: tab === 0 ? 'rgb(124 58 237)' : 'rgb(107 114 128)',
                py: 1,
                borderBottom: tab === 0 ? '3px solid rgb(124 58 237)' : 'none',
            }}>
            توضیحات
        </Link>,
        <Link
            href="#properties"
            underline="none"
            onClick={() => setTab(1)}
            sx={{
                fontSize: 14,
                fontWeight: 500,
                color: tab === 1 ? 'rgb(124 58 237)' : 'rgb(107 114 128)',
                borderBottom: tab === 1 ? '3px solid rgb(124 58 237)' : 'none'
            }}>
            مشخصات
        </Link>,
        <Link
            href="#comments"
            underline="none"
            onClick={() => setTab(2)}
            sx={{
                fontSize: 14,
                fontWeight: 500,
                color: tab === 2 ? 'rgb(124 58 237)' : 'rgb(107 114 128)',
                borderBottom: tab === 2 ? '3px solid rgb(124 58 237)' : 'none'
            }}>
            دیدگاه&zwnj;ها
        </Link>,
    ];

    return (
        <>
            <Header />
            <div className="w-11/12 min-h-screen mx-auto">
                <div className="w-full h-10">
                    <Breadcrumbs
                        separator={<ChevronLeftIcon className="w-4 h-4 text-gray-400" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbs}
                    </Breadcrumbs>
                </div>
                <Paper className="w-full h-auto shadow-md" variant="outlined">
                    <div className="flex">
                        <div className="w-1/12">
                            <List className="w-full h-full flex flex-col justify-center items-center">
                                <ListItem>
                                    <ListItemIcon>
                                        <IconButton>
                                            <HeartIcon className="w-6 h-6 text-red-500" />
                                        </IconButton>
                                    </ListItemIcon>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconButton>
                                            <ShareIcon className="w-6 h-6 text-gray-500" />
                                        </IconButton>
                                    </ListItemIcon>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <IconButton>
                                            <PresentationChartLineIcon className="w-6 h-6 text-gray-500" />
                                        </IconButton>
                                    </ListItemIcon>
                                </ListItem>
                            </List>
                        </div>
                        <div className="w-3/12 h-96 flex flex-col justify-between items-center my-4">
                            <div className="w-full my-3">
                                <Image src={'/assets/images/4962058.jpg'} width={360} height={360} className="rounded" />
                            </div>
                            <div className="w-full flex justify-between items-center">
                                <Image src={'/assets/images/4962058.jpg'} width={60} height={60} className="rounded" />
                                <Image src={'/assets/images/4962058.jpg'} width={60} height={60} className="rounded" />
                                <Image src={'/assets/images/4962058.jpg'} width={60} height={60} className="rounded" />
                            </div>
                        </div>
                        <div className="w-8/12 flex flex-col my-1 mx-8">
                            <div className="w-full h-8 flex justify-start items-center">
                                <SearchCircleIcon className="w-6 h-6 text-gray-500 ml-4" />
                                <Breadcrumbs aria-label="category">
                                    {category}
                                </Breadcrumbs>
                            </div>
                            <h1 className="text-xl text-medium text-gray-800 py-2 border-b border-gray-300">
                                روتختی کریستال ژاکارد 10 تیکه
                            </h1>
                            <div className="w-full h-12 flex justify-start items-center">
                                <Rating className={classes.rating} max={1} precision={0.1} defaultValue={4.2} readOnly />
                                <span className="px-2 text-md text-medium text-gray-700">4.2</span>
                            </div>
                            <div className="w-full h-16 mt-2">
                                <Card sx={{ display: 'flex', alignItems: 'center', height: 40 }} variant="outlined">
                                    <InformationCircleIcon className="w-5 h-5 mx-4 text-gray-700" />
                                    <p className="text-small text-gray-700">
                                        امکان برگشت کالا با دلیل "انصراف از خرید"
                                        تنها در صورتی مورد قبول است که پلمب کالا باز نشده باشد.
                                    </p>
                                </Card>
                            </div>
                            <div className="w-full h-36 mt-2 mb-4 flex justify-around items-center">
                                <div className="w-1/2 h-40">
                                    <List sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <MinusSmIcon className="w-4 h-4 text-gray-600" />
                                            </ListItemIcon>
                                            <ListItemText className={classes.itemTextSmall}>جنس پلی&zwnj;استر</ListItemText>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <MinusSmIcon className="w-4 h-4 text-gray-600" />
                                            </ListItemIcon>
                                            <ListItemText className={classes.itemTextSmall}>کتان %40</ListItemText>
                                        </ListItem>
                                    </List>
                                </div>
                                <div className="w-1/2 h-40 flex justify-around items-center">
                                    <span className="text-medium text-semi-small mr-4">انتخاب رنگ</span>
                                    <div className="w-36 h-20 flex flex-col justify-evenly items-center">
                                        <button className="w-8 h-8 rounded-full" style={{ backgroundColor: '#F9C7E2' }}>
                                            <CheckIcon className="w-6 h-6 mx-auto" />
                                        </button>
                                        <button className="w-8 h-8 rounded-full" style={{ backgroundColor: '#229ED9' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-16 flex justify-around items-center">
                                <p className="w-2/5 h-12 rounded flex justify-center items-center border border-purple-400">
                                    <span className="text-bold px-0.5">900,000</span>
                                    <span className="text-medium px-0.5">تومان</span>
                                </p>
                                <Button variant="contained" sx={{ width: '40%', height: 48, backgroundColor: 'rgb(168 85 247)' }}
                                    startIcon={<ShoppingCartIcon className="w-6 h-6" />}>
                                    افزودن به سبد خرید
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
                <div className="w-full h-60 my-8">
                    <p className="text-medium text-gray-900">کالاهای مشابه</p>
                    <Paper className="w-full h-full" variant="outlined">

                    </Paper>
                </div>
                <div className="w-full h-auto my-6">
                    <Breadcrumbs separator={<span />}
                        sx={{
                            width: '100 %',
                            p: 2,
                            height: 60,
                            backgroundColor: '#ffffff',
                            marginTop: 2,
                            position: 'sticky',
                            top: 0,
                            borderBottom: '1px solid rgb(209 213 219)'
                        }}>
                        {tabs}
                    </Breadcrumbs>
                    <Card id="description" variant="outlined">
                        <h3 className="w-24 text-medium text-center py-2 mx-4 my-2 border-b-2 border-purple-500">توضیحات</h3>
                        <p className="w-full h-60 leading-8 text-base px-4 pt-6 pb-2 text-justify text-gray-900">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ،
                            و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                            و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
                            کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
                            تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای
                            علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد،
                            در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها،
                            و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی،
                            و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
                        </p>
                    </Card>
                    <Card id="properties" variant="outlined" className="my-8">
                        <h3 className="w-24 text-base h-auto text-medium text-center mx-4 py-2 my-2 border-b-2 border-purple-500">مشخصات</h3>
                        <caption className="w-36 text-base text-medium text-gray-600 py-4">مشخصات محصول</caption>
                        <TableContainer sx={{ width: '75%', my: 4, mx: 4 }}>
                            <Table>
                                <TableRow>
                                    <TableCell sx={{ color: 'rgb(75 85 99)' }}>ابعاد</TableCell>
                                    <TableCell>104 × 210 سانتی&zwnj;متر</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ color: 'rgb(75 85 99)' }}>وزن</TableCell>
                                    <TableCell>2.26 کیلوگرم</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ color: 'rgb(75 85 99)' }}>جنس</TableCell>
                                    <TableCell>پلی&zwnj;استر</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={{ color: 'rgb(75 85 99)' }}>اقلام همراه</TableCell>
                                    <TableCell>دو عدد روبالش، دو عدد رو کوسن</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Card>
                    <Card id="comments" variant="outlined" className="pb-8">
                        <h3 className="w-24 text-medium text-center py-2 mx-4 my-2 border-b-2 border-purple-500">دیدگاه&zwnj;ها</h3>
                        <Comment comment={'سلام. جنسش خوبه؟'} name={'رضا صیدمرادی'}>
                            <Comment comment={'پلی استره دیگه'} name={'فاطمه اکبری'} child />
                            <Comment comment={'عالیه'} name={'علی قربانی'} child />
                            <Comment comment={'دوامش خوبه'} name={'زهرا صادقی'} child />
                        </Comment>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Product; */