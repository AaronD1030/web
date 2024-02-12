import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Archive = () => {

    const navigate = useNavigate();


    return (
        <>
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
            <p>Dito yung Archive</p>
        </>
    );
};

export default Archive;
