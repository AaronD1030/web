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
import { IWorkProgress } from "../types/Types";
import { db } from "../FirebaseConfig";
import moment from "moment";

interface Props {
  email: string;
}

const WorkProgress = ({ email }: Props) => {
  const [workProgressData, setWorkProgressData] = useState<IWorkProgress[]>([]);

  const bmiCollectionRef = collection(db, "workProgress");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(bmiCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IWorkProgress)
      );

      setWorkProgressData(data as IWorkProgress[]);
    };
    fetchData();
  }, []);

  return (
    <div style={{ maxWidth: "880px", width: "100%" }}>
      <TableContainer
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#ccc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Name of Workout
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Level of Workout
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                BMI Result
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                BMI Category
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workProgressData?.map((item, key) => (
              <TableRow key={key}>
                <TableCell align="center">
                  {moment(item.date).format("YYYY-MM-DD hh:mm A")}
                </TableCell>
                <TableCell align="center">{item.nameOfWork}</TableCell>
                <TableCell align="center">{item.levelWorkout}</TableCell>
                <TableCell align="center">{item.bmiResult}</TableCell>
                <TableCell align="center">{item.bmiCategory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default WorkProgress;
