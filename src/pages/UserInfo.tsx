import { useEffect, useState } from "react";
import BmiList from "./BmiList";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { IBMIData, IUserData } from "../types/Types";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import MealPlanner from "./MealPlanner";
import WorkProgress from "./WorkProgress";
import MonthlyMembership from "./MonthlyMembership";
import { Button } from "@mui/material";

const UserInfo = () => {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  const [userData, setUserData] = useState<IUserData | undefined>();

  const userCollectionList = collection(db, "users");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(userCollectionList, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(
        (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as IUserData)
      );

      setUserData(data.length > 0 ? data[0] : undefined);
    };
    fetchData();
  }, []);

  // bmi
  const [bmiResult, setBmiResult] = useState<IBMIData | undefined>();

  const bmiResultCollectionList = collection(db, "bmiResult");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(bmiResultCollectionList, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(
        (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as IBMIData)
      );

      setBmiResult(data.length > 0 ? data[0] : undefined);
      console.log(data.length > 0 ? data[0] : undefined)
    };
    fetchData();
  }, []);

  // bmi

  return (
    <>
      {/* <Navbar /> */}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "50px",
        }}
      >
        <div style={{ maxWidth: "1100px", width: "100%" }}>
          <Button
            sx={{
              padding: "10px 40px",
              border: "2px solid black",
              margin: "5px",
            }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "10px",
            maxWidth: "1100px",
            width: "100%",
            paddingBottom: "20px",
          }}
        >
          <section
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {userData?.id}
              </span>
              User ID
            </label>
            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {userData?.fullName}
              </span>
              Name
            </label>

            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {userData?.email}
              </span>
              Email
            </label>

            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {userData?.address}
              </span>
              Address
            </label>

            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {moment(userData?.createdAt).format("YYYY/MM/DD")}
              </span>
              Registration Date:
            </label>
          </section>

          <section
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {moment(userData?.dateOfBirth?.toDate()).local().format("L")}
              </span>
              Birthday
            </label>

            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {bmiResult?.age}
              </span>
              Age
            </label>

            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {bmiResult?.height}
              </span>
              Height
            </label>

            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {userData?.medicalConditions}
              </span>
              Medical Condition
            </label>

            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {bmiResult?.weight}
              </span>
              Weight
            </label>

            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {userData?.membership}
              </span>
              Membership
            </label>
          </section>
        </div>

        <h2>BMI Results</h2>
        <BmiList email={email || ""} />

        <h2>Monthly Membership</h2>
        <MonthlyMembership email={email || ""} />

        <h2>Meal Plan</h2>
        <MealPlanner />

        <h2>Work Progress</h2>
        <WorkProgress email={email || ""} />
      </div>
    </>
  );
};

export default UserInfo;
