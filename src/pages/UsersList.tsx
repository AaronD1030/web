import {
  Dialog,
  DialogContent,
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
import moment from "moment";
import BMICalculator from "./BmiCalculator";
import { Link } from "react-router-dom";
import Confirmation from "../components/confirmationMembership/Confirmation";

function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${hours}hr ${minutes}minutes ${seconds}seconds`;
  return formattedTime;
}

const UsersList = () => {
  const [usersData, setUsersData] = useState<IUserData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAddMembershipOpen, setIsAddMembershipOpen] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [nameOfPerson, setNameOfPerson] = useState<string>("");
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

  const toggleOpen = (id: string) => {
    setEmail(id);
    setIsOpen(true);
  };

  const toggleClose = () => {
    setIsOpen(false);
  };

  const toggleOpenAddMembership = (id: string, name: string) => {
    setEmail(id);
    setIsAddMembershipOpen(true);
    setNameOfPerson(name);
  };

  const toggleCloseAddMembership = () => {
    setIsAddMembershipOpen(false);
  };

  const filteredData = usersData.filter(
    (item) =>
      item?.fullName?.toLowerCase()?.includes(search.trim()) ||
      item?.email?.toLowerCase()?.includes(search.trim())
  );

  return (
    <div className="flex flex-wrap overflow-y-scroll gap-4">
      <TableContainer sx={tableContainer}>
        <div className="fixed bg-gray-200 w-full top-0 py-4">
          <span style={tableTitle}>Users</span>
          <TextField
            id="outlined-search"
            label="Search field"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
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
                Birthday
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Total Log In time
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Last Log In time
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.map((item, key) => (
              <TableRow key={key}>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.fullName}</TableCell>
                <TableCell align="center">
                  {moment(item.dateOfBirth?.toDate()).local().format("L")}
                </TableCell>
                <TableCell align="center">
                  {item.totalLogInTime
                    ? formatTime(item?.totalLogInTime)
                    : "No login time"}
                </TableCell>
                <TableCell align="center">
                  {item.lastLoginTime &&
                    moment(item.lastLoginTime?.toDate()).local().format("L")}
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
                  <button style={btn} onClick={() => toggleOpen(item.email)}>
                    Add BMI
                  </button>

                  <button
                    style={btn}
                    onClick={() =>
                      toggleOpenAddMembership(item.email, item.fullName)
                    }
                  >
                    Add Payment
                  </button>

                  <Link to={`/user?email=${item.email}`}>
                    <button style={btn}>View Info</button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isOpen} onClose={toggleClose}>
        <DialogContent>
          <BMICalculator email={email} toggleClose={toggleClose} />
        </DialogContent>
      </Dialog>
      <Dialog open={isAddMembershipOpen} onClose={toggleCloseAddMembership}>
        <DialogContent>
          <Confirmation
            nameOfPerson={nameOfPerson}
            closeModal={toggleCloseAddMembership}
            email={email}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersList;

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
