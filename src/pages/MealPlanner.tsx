import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IFoodStatus } from "../types/Types";
import { useLocation } from "react-router-dom";

const MealPlanner = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  console.log("eto ung email: ", email);

  const { data } = useQuery<IFoodStatus[]>({
    queryKey: ["MealPlanner"],
    queryFn: () =>
      axios
        .get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/food/food-status/list/${email}`
        )
        .then((res) => res.data),
  });

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
        <Table>
          <TableHead sx={{ backgroundColor: "#ccc" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Meal Plan Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Date and Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, key) => (
              <TableRow key={key}>
                <TableCell align="center">{item.nameOfFood}</TableCell>
                <TableCell align="center">{item.dateAndTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MealPlanner;
