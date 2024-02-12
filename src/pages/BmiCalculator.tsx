import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import GenderSelect from "../components/genderSelect/GenderSelect";
import SliderInput from "../components/SliderInput";
import CounterInput from "../components/counterInput/CounterInput";
import { db } from "../FirebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface Props {
  email: string;
  toggleClose: () => void;
}

const BMICalculator = ({ email, toggleClose }: Props) => {
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState(160);
  const [weight, setWeight] = useState(60);
  const [bmiResult, setBMIResult] = useState(0);

  useEffect(() => {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const finalBmi = Math.round(bmi * 1e2) / 1e2;
    setBMIResult(finalBmi);
  }, [height, weight]);

  const handleSubmitBmiResult = async () => {
    let bmiCategory = "";
    if (bmiResult < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmiResult >= 18.5 && bmiResult < 24.9) {
      bmiCategory = "Normal";
    } else if (bmiResult >= 25 && bmiResult < 29.9) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }

    try {
      // Add new record
      await addDoc(collection(db, "bmiResult"), {
        email: email,
        gender: gender,
        height: height,
        weight: weight,
        bmiResult: bmiResult,
        bmiCategory: bmiCategory,
        createdAt: serverTimestamp(),
      });

      window.location.reload();
    } catch (error) {
      console.error("Error saving BMI result:", error);
    }
  };

  const disabled = gender === "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        paddingTop: "20px",
        alignItems: "center",
        position: "relative",
      }}
    >
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "0",
          right: "0",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onClick={toggleClose}
      >
        X
      </button>
      <span
        style={{
          color: "black",
          textAlign: "center",
          fontSize: 16,
          fontWeight: "bold",
          padding: "20px 0",
        }}
      >
        {email}
      </span>
      <GenderSelect
        onSelectGender={(selectedGender: string) => setGender(selectedGender)}
        gender={gender}
      />
      <SliderInput
        label="Height (cm)"
        value={height}
        min={100}
        max={250}
        step={1}
        setHeight={setHeight}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          marginTop: "20px",
          marginBottom: "20px",
          justifyContent: "space-around",
        }}
      >
        <CounterInput
          label="Weight (kg)"
          value={weight}
          setIncrease={setWeight}
          setDecrease={setWeight}
        />
      </div>
      <Button
        onClick={handleSubmitBmiResult}
        variant="contained"
        style={{
          width: "100%",
          height: 60,
          borderRadius: 10,
          margin: "10px 0",
          background: disabled
            ? "linear-gradient(#d3d3d3, #d3d3d3)"
            : "linear-gradient(#FFAA21, #FFC42C)",
        }}
        disabled={disabled}
      >
        <span
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Calculate BMI
        </span>
      </Button>
    </div>
  );
};

export default BMICalculator;
