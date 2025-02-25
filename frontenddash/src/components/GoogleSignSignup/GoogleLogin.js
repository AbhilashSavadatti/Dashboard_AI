import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "./api";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useUser } from "../../context/UserContext";

const GoolgeLogin = (props) => {
  const { login } = useUser();
  const navigate = useNavigate();
  const responseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const result = await googleAuth(authResult.code);
        // const { email, name, image } = result.data.user;
        const data = result.data;
        login(data);
        navigate("/dashboard");
      } else {
        console.log(authResult);
        throw new Error(authResult);
      }
    } catch (e) {
      console.log("Error while Google Login...", e);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <div className="App">
      <button
        onClick={googleLogin}
        style={{
          backgroundColor: "#4285F4",
          color: "#fff",
          padding: "8px 24px",
          width: "100%",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          margin: "10px 0px",
          justifyContent: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        type="button"
      >
        <FaGoogle style={{ marginRight: "8px", fontSize: "20px" }} />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoolgeLogin;
