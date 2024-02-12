import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IBMIData } from "../types/Types";
import { db } from "../FirebaseConfig";
import moment from "moment";

interface Props {
  email: string;
}

const BmiList = ({ email }: Props) => {
  const [bmiData, setBmiData] = useState<IBMIData[]>([]);

  const bmiCollectionRef = collection(db, "bmiResult");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(bmiCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IBMIData)
      );

      setBmiData(data as IBMIData[]);
    };
    fetchData();
  }, []);

  return (
    <div>
      <TableContainer
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Table sx={{ maxWidth: "1100px" }}>
          <TableHead sx={{ backgroundColor: "#ccc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                User Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Bmi Result
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Bmi Category
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Age
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Gender
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Height
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Weight
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bmiData?.map((item, key) => (
              <TableRow key={key}>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">{item.bmiResult}</TableCell>
                <TableCell align="center">{item.bmiCategory}</TableCell>
                <TableCell align="center">{item.age}</TableCell>
                <TableCell align="center">{item.gender}</TableCell>
                <TableCell align="center">{item.height}</TableCell>
                <TableCell align="center">{item.weight}</TableCell>
                <TableCell align="center">
                  {moment(
                    item.createdAt.seconds * 1000 +
                      item.createdAt.nanoseconds / 1e6
                  ).format("YYYY-MM-DD hh:mm A")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BmiList;
