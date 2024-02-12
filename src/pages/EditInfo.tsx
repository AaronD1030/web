import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";

const UserInfo = () => {
    const [searchParams] = useSearchParams();

    const email = searchParams.get("email");
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
            <p>Dito mageedit info ni {email}</p>
        </>
    );
};

export default UserInfo;
