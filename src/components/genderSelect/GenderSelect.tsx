import { useState, useEffect } from "react";
import "./GenderSelect.css"; // Import your CSS file
import { Female, Male } from "@mui/icons-material";

interface Props {
  onSelectGender: (gender: string) => void;
  gender: string;
}

const GenderSelect = ({ onSelectGender, gender }: Props) => {
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    setSelectedGender(gender);
  }, [gender]);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    onSelectGender(gender);
  };

  return (
    <div className="gender-select-container">
      <div
        className={`gender-option ${
          selectedGender === "male" ? "selected" : ""
        }`}
        onClick={() => handleGenderSelect("male")}
      >
        <Male
          sx={{ fontSize: "60px" }}
          className={`icon ${selectedGender === "male" ? "selected" : ""}`}
        />
        <div
          className={`gender-text ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          Male
        </div>
      </div>

      <div
        className={`gender-option ${
          selectedGender === "female" ? "selected" : ""
        }`}
        onClick={() => handleGenderSelect("female")}
      >
        <Female
          sx={{ fontSize: "60px" }}
          className={`icon ${selectedGender === "female" ? "selected" : ""}`}
        />
        <div
          className={`gender-text ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          Female
        </div>
      </div>
    </div>
  );
};

export default GenderSelect;
