import React, { useState } from "react";
import UserHeader from '../../components/UserHeader';
import UserPanelDrawer from "../../components/UserPanelDrawer";
import TextField from "../../components/TextField";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "../../components/Table";

function Orders() {

    const [open, setOpen] = useState(false)

    return (
        <div className="w-full h-full flex dark:bg-gray-800 transition-all">
            <UserPanelDrawer open={open} onChangeState={() => { setOpen(!open) }} />
            <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all overflow-hidden">
                <UserHeader />
                <div className="w-full h-auto">
                    <div className="w-[98%] h-auto mx-auto">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders;