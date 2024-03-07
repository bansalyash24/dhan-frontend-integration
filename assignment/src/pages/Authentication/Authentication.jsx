import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from './Authentication.module.css';

function AuthenticationPage() {
  const [accessToken, setAccessToken] = useState("");
  const [cookies, setCookie] = useCookies("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.token) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.authComponent}>
      <h5 className={styles.title}>Login using Access-Token</h5>
      <div className={styles.loginBox}>
        <input
          type="text"
          placeholder="Enter Access Token to go ahead"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          className={styles.inputField}
        />
        <button
          onClick={() => {
            setCookie("token", accessToken);
            toast.success("Authentication Successful");
            navigate("/");
          }}
          className={styles.submitButton}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default AuthenticationPage;
