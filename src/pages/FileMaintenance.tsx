import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IUserData } from "../types/Types";
import { db } from "../FirebaseConfig";
import { Link } from "react-router-dom";


const FileMaintenance = () => {
    const [usersData, setUsersData] = useState<IUserData[]>([]);
    const [search, setSearch] = useState<string>("");

    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(usersCollectionRef);

            const data = querySnapshot.docs.map(
                (doc) =>
                ({
                    id: doc.id,
                    ...doc.data(),
                } as IUserData)
            );

            setUsersData(data as IUserData[]);
        };
        fetchData();
    }, []);


    const filteredData = usersData.filter(
        (item) =>
            item?.fullName?.toLowerCase()?.includes(search.trim()) ||
            item?.email?.toLowerCase()?.includes(search.trim())
    );

    return (
        <div className="flex flex-wrap overflow-y-scroll gap-4">
            <TableContainer sx={tableContainer}>
                <div className="fixed bg-gray-200 w-full flex items-center gap-4 top-0 py-4">
                    <span style={tableTitle}>Clients</span>
                    <TextField
                        id="outlined-search"
                        label="Search field"
                        type="search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link className="border border-gray-500 px-4 py-2" to={"/archive"}>Archive</Link>
                </div>
                <Table className="mt-24">
                    <TableHead sx={tableHeader}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                                User Email
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                                User Name
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                                Personal Information
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                                Meal Plan
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }} align="center">
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData?.map((item, key) => (
                            <TableRow key={key}>
                                <TableCell align="center">{item.email}</TableCell>
                                <TableCell align="center">{item.fullName}</TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <Link to={`/editInfo?email=${item.email}`}>
                                        <button style={btn}>Edit Info</button>
                                    </Link>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <Link to={`/editMealPLan?email=${item.email}`}>
                                        <button style={btn}>Edit Meal Plan</button>
                                    </Link>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <Link to={`/archive?email=${item.email}`}>
                                        <button style={btn}>Archive</button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default FileMaintenance;

const tableContainer: React.CSSProperties = {
    width: "100%",
    backgroundColor: "#ffffff",
};

const tableHeader: React.CSSProperties = {
    backgroundColor: "#F7F7F7",
};

const tableTitle: React.CSSProperties = {
    fontSize: "25px",
    padding: "20px",
};

const btn: React.CSSProperties = {
    backgroundColor: "#00A36C",
    color: "#ffffff",
    padding: "10px 0",
    width: "100px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    margin: "0 5px",
};
