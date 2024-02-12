import React, { ReactNode } from "react";
import useAuthStore from "../zustand/AuthStore";
import { IoStatsChartOutline } from "react-icons/io5";
import { PiUsersThreeBold } from "react-icons/pi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link } from "react-router-dom";

interface AdminLayoutProps {
    children: ReactNode;
}

const Layout: React.FC<AdminLayoutProps> = ({ children }) => {
    const clearUser = useAuthStore((state) => state.clearUser);
    const user = useAuthStore((state) => state.user);
    return (
        <div className="grid grid-cols-12 h-full w-full" >
            <div className="col-span-2 flex flex-col sticky top-0 font-bold h-screen text-xl p-6 bg-cyan-600">
                <Link to="/">
                    <img className="pb-6" src="/download.png" alt="logo" />
                </Link>
                <Link
                    to="/statistics"
                    className="px-4 items-center active:bg-cyan-700 active:rounded-full hover:bg-cyan-700 hover:rounded-full h-max py-2 flex gap-4"
                >
                    <IoStatsChartOutline />
                    STATISTICS
                </Link>
                <Link
                    to="/mealPlan"
                    className="px-4 items-center active:bg-cyan-700 active:rounded-full hover:bg-cyan-700 hover:rounded-full h-max py-2 flex gap-4"
                >
                    <IoStatsChartOutline />
                    MEAL PLAN
                </Link>
                <Link
                    to="/wotkOut"
                    className="px-4 items-center active:bg-cyan-700 active:rounded-full hover:bg-cyan-700 hover:rounded-full h-max py-2 flex gap-4"
                >
                    <IoStatsChartOutline />
                    WORK OUT
                </Link>
                <Link
                    to="/userList"
                    className="px-4 items-center active:bg-cyan-700 active:rounded-full hover:bg-cyan-700 hover:rounded-full h-max py-2 flex gap-4"
                >
                    <PiUsersThreeBold />
                    ACCOUNTS
                </Link>
                {user ? <button
                    className="px-4 items-center hover:bg-cyan-700 hover:rounded-full h-max py-2 flex gap-4"
                    onClick={clearUser}><RiLogoutBoxRLine /> Logout</button> :
                    <Link
                        to="/login"
                        className="px-4 items-center hover:bg-cyan-700 hover:rounded-full h-max py-2 flex gap-4"
                    >
                        <RiLogoutBoxRLine />
                        Login
                    </Link>
                }
            </div>
            <div className="col-span-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;