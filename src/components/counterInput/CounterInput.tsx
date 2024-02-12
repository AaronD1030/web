import { Button } from "@mui/material";
import "./CounterInput.css"; // Import your CSS file
// import { useState } from "react";

interface Props {
  label: string;
  value: number;
  setIncrease: (prevState: number) => void;
  setDecrease: (prevState: number) => void;
}

const CounterInput = ({ label, value, setIncrease, setDecrease }: Props) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Assuming you want to update the state when the input changes
    // You might want to add validation or sanitization here
    const newValue = parseInt(event.target.value, 10) || 0;
    setIncrease(newValue);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "98%",
        height: "170px",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        border: "2px solid black",
        borderRadius: "10px",
      }}
    >
      <span style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
        {label}
      </span>
      <div
        style={{
          alignItems: "center",
        }}
      >
        <input
          value={value}
          type="number"
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "black",
            width: "50px",
            padding: "10px",
            textAlign: "center",
          }}
          onChange={handleInputChange}
        />
        <div
          style={{
            flexDirection: "row",
            marginTop: 15,
          }}
        >
          <Button
            onClick={() => setDecrease(value - 1)}
            variant="contained"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "black",
              marginRight: 10,
              color: "white",
            }}
          >
            -
          </Button>
          <Button
            onClick={() => setIncrease(value + 1)}
            variant="contained"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "black",
              marginLeft: 10,
              color: "white",
            }}
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CounterInput;
