import "./Login.css";
import { ILogin } from "../../types/Types";
import { useState } from "react";
import useAuthStore from "../../zustand/AuthStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      const user = userCredential.user;
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userData = {
          dateOfBirth: doc.data().dateOfBirth,
          email: doc.data().email,
          fullName: doc.data().fullName,
          role: doc.data().role,
        };
        if (userData.role === "admin") {
          setUser(credentials.email);
          navigate("/");
        } else {
          setLoading(false);
          setErrors("You do not have permission to log in.");
        }
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      setErrors("Incorrect email or password.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Login</h2>
        <hr />
        <p>Welcome to Capt's Gym Admin</p>
        <div className="input-container">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={onChangeHandler}
            style={{ paddingLeft: "10px" }}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
            style={{ paddingLeft: "10px" }}
          />
          {errors && (
            <div style={{ padding: "5px 0" }}>
              <span style={{ color: "red" }}>{errors}</span>
            </div>
          )}
          <button className="login-btn" onClick={handleLogin}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
