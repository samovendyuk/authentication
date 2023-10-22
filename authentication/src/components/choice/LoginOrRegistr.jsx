import styles from "./logOrRegistr.module.css";
import { useNavigate } from "react-router-dom";

function LoginOrRegister() {
  const nav = useNavigate();

  return (
    <div className={styles.check}>
      <h1>What do you want?</h1>
      <button
        type="button"
        class="btn btn-primary btn-lg"
        onClick={() => nav("/registration")}
      >
        Registration
      </button>
      <button
        type="button"
        class="btn btn-primary btn-lg"
        onClick={() => nav("/login")}
      >
        Login
      </button>
    </div>
  );
}

export default LoginOrRegister;
