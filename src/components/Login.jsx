import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./login.module.css";
import PageNav from "./PageNav";
import { useContext, useEffect, useState } from "react";
import { FakeAuthContext } from "../contexts/FakeAuthProvider";

export default function Login() {
  const [email, setEmail] = useState("fakeuser@test.com");
  const { login, isAuth } = useContext(FakeAuthContext);
  const navigate = useNavigate();

  function handleSubmitEmail(e) {
    e.preventDefault();
    if (email) login(email);
  }

  useEffect(() => {
    if (isAuth) navigate("/app", { replace: true });
  }, [isAuth, navigate]);
  return (
    <section className="container">
      <PageNav />
      <main className={styles.main}>
        <form className={styles.form} action="" onSubmit={handleSubmitEmail}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          {/* <Link to="/app"> */}
          <Button styl={styles.loginBtn}>login</Button>
          {/* </Link> */}
        </form>
      </main>
    </section>
  );
}
