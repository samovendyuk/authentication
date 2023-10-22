import styles from "./navbar.module.css";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const { logOut, user } = useAuth();

  return (
    <>
      <nav class="navbar bg-body-tertiary" className={styles.nav}>
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Hi {user}</span>

          <span class="navbar-brand mb-0 h1" onClick={logOut}>
            Log out
          </span>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
