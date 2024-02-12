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
import { IMonthlyMembership } from "../types/Types";
import { db } from "../FirebaseConfig";
import moment from "moment";

interface Props {
  email: string;
}

const MonthlyMembership = ({ email }: Props) => {
  const [monthlyMembershipData, setMonthlyMembershipData] = useState<
    IMonthlyMembership[]
  >([]);

  const bmiCollectionRef = collection(db, "monthlyMembership");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(bmiCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            email: doc.data().email,
            date: doc.data().date,
            amount: doc.data().amount,
          } as IMonthlyMembership)
      );

      const sortedData = data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setMonthlyMembershipData(sortedData);
    };

    fetchData();
  }, [bmiCollectionRef, email]);

  return (
    <div style={{ maxWidth: "950px", width: "100%" }}>
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
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyMembershipData?.map((item, key) => (
              <TableRow key={key}>
                <TableCell align="center">
                  {moment(item.date).format("YYYY-MM-DD hh:mm A")}
                </TableCell>
                <TableCell align="center">₱{item.amount}.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MonthlyMembership;
