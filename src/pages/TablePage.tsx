import React from "react";
import Navbar from "../components/navbar/Navbar";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useFirestoreCollection } from "../FireStoreCollection";

const TablePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const collectionName = params.get("collectionName");
  const filter = params.get("filter");
  const whatToFilter = params.get("whatToFilter");
  const title = params.get("title");

  const allUsersData = useFirestoreCollection(
    collectionName ? collectionName : "users",
    filter ? filter : "",
    whatToFilter ? whatToFilter : ""
  );

  return (
    <div style={home}>
      <Navbar />
      <div style={purpleContainer}>
        <div style={boxContainer}></div>
      </div>
      <div style={container}>
        <TableContainer sx={tableContainer}>
          <Button
            sx={{
              padding: "10px 40px",
              border: "2px solid black",
              margin: "5px",
            }}
            href="/"
          >
            Back
          </Button>
          <div style={tableTopHeader}>
            <span style={tableTitle}>{title}</span>
          </div>
          <Table sx={table}>
            <TableHead sx={tableHeader}>
              <TableRow>
                <TableCell sx={tableCellHeader} align="center">
                  #
                </TableCell>
                <TableCell sx={tableCellHeader} align="center">
                  User ID
                </TableCell>
                <TableCell sx={tableCellHeader} align="center">
                  User Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsersData?.map((item, key) => (
                <TableRow key={key}>
                  <TableCell sx={tableCellBody} align="center">
                    {key + 1}
                  </TableCell>
                  <TableCell sx={tableCellBody} align="center">
                    {item.id}
                  </TableCell>
                  <TableCell sx={tableCellBody} align="center">
                    {item.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TablePage;

const home: React.CSSProperties = {
  minHeight: "100vh",
  height: "100%",
  width: "100vw",
  backgroundColor: "#ECECEC",
  paddingBottom: "100px",
};

const purpleContainer: React.CSSProperties = {
  backgroundColor: "#6249FD",
  width: "100%",
  height: "300px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const boxContainer: React.CSSProperties = {
  maxWidth: "1100px",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  alignContent: "center",
  justifyContent: "center",
  gap: "10px",
  marginTop: "250px",
};

const container: React.CSSProperties = {
  width: "100%",
  position: "absolute",
  top: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const tableContainer: React.CSSProperties = {
  maxWidth: "1100px",
  width: "100%",
  backgroundColor: "#ffffff",
};

const tableHeader: React.CSSProperties = {
  backgroundColor: "#F7F7F7",
};

const tableTopHeader: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#ffffff",
  display: "flex",
  alignItems: "flex-start",
};

const tableTitle: React.CSSProperties = {
  fontSize: "25px",
  padding: "20px",
};

const table: React.CSSProperties = {
  border: "1px solid black",
};

const tableCellHeader: React.CSSProperties = {
  fontWeight: "bold",
  border: "1px solid black",
};

const tableCellBody: React.CSSProperties = {
  border: "1px solid black",
};
