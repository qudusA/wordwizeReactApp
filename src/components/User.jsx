import { useContext } from "react";
import Button from "./Button";
import styles from "./user.module.css";
import { useNavigate } from "react-router-dom";
import { FakeAuthContext } from "../contexts/FakeAuthProvider";

export default function User() {
  const { logout, user } = useContext(FakeAuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div>
        <img src={user?.avatar} alt="user image" />
      </div>
      <p>welcome, {user?.name}</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
