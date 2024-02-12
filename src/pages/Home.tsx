import React from "react";
import DashboardCountingBox from "../components/DashboardCountingBox";
import Navbar from "../components/navbar/Navbar";
import { Group } from "@mui/icons-material";
import { useFirestoreCollection } from "../FireStoreCollection";
import UsersList from "./UsersList";

const Home = () => {
  const allUsersData = useFirestoreCollection("users");
  const nonMembersData = useFirestoreCollection(
    "users",
    "Non-member",
    "membership"
  );
  const membersData = useFirestoreCollection("users", "Member", "membership");
  const totalUnderweight = useFirestoreCollection(
    "bmiResult",
    "Underweight",
    "bmiCategory"
  );
  const totalNormal = useFirestoreCollection(
    "bmiResult",
    "Normal",
    "bmiCategory"
  );
  const totalOverweight = useFirestoreCollection(
    "bmiResult",
    "Overweight",
    "bmiCategory"
  );
  const totalObese = useFirestoreCollection(
    "bmiResult",
    "Obese",
    "bmiCategory"
  );

  return (
    <div style={home}>
      <Navbar />
      <div style={purpleContainer}>
        <div style={boxContainer}>
          <DashboardCountingBox
            title="Total Account Created"
            materialUiIcon={Group}
            count={allUsersData.length}
            collectionName="users"
            filter=""
            whatToFilter=""
          />

          <DashboardCountingBox
            title="Total Member"
            materialUiIcon={Group}
            count={membersData.length}
            collectionName="users"
            filter="Member"
            whatToFilter="membership"
          />

          <DashboardCountingBox
            title="Total Non Member"
            materialUiIcon={Group}
            count={nonMembersData.length}
            collectionName="users"
            filter="Non-member"
            whatToFilter="membership"
          />

          <DashboardCountingBox
            title="Total Active Users"
            materialUiIcon={Group}
            count={allUsersData.length}
            collectionName="users"
            filter=""
            whatToFilter=""
          />

          {/* BMI */}
          <DashboardCountingBox
            title="Total Underweight"
            materialUiIcon={Group}
            count={totalUnderweight.length}
            collectionName="bmiResult"
            filter="Underweight"
            whatToFilter="bmiCategory"
          />

          <DashboardCountingBox
            title="Total Normal Weight"
            materialUiIcon={Group}
            count={totalNormal.length}
            collectionName="bmiResult"
            filter="Normal"
            whatToFilter="bmiCategory"
          />

          <DashboardCountingBox
            title="Total Overweight"
            materialUiIcon={Group}
            count={totalOverweight.length}
            collectionName="bmiResult"
            filter="Overweight"
            whatToFilter="bmiCategory"
          />

          <DashboardCountingBox
            title="Total Obese"
            materialUiIcon={Group}
            count={totalObese.length}
            collectionName="bmiResult"
            filter="Obese"
            whatToFilter="bmiCategory"
          />
        </div>
      </div>
      <UsersList />
    </div>
  );
};

export default Home;

const home: React.CSSProperties = {
  minHeight: "100vh",
  height: "100%",
  width: "100vw",
  backgroundColor: "#ECECEC",
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
