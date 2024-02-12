import { Slider } from "@mui/material";

interface Props {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  setHeight: (value: number) => void;
}

const SliderInput = ({
  label,
  value,
  min,
  max,
  step,
  setHeight,
}: //   ,
Props) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(event);
    if (typeof newValue === "number") {
      setHeight(newValue);
    }
  };

  return (
    <div
      className="slider-input-container"
      style={{
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        height: "170px",
        width: "90%",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <span
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "black",
        }}
      >
        {label}
      </span>
      <span
        style={{
          textAlign: "center",
          fontSize: 30,
          padding: "20px 0",
          color: "black",
        }}
      >
        {value}
      </span>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    </div>
  );
};

export default SliderInput;
