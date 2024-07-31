import styles from "./mainApp.module.css";
import Logo from "./Logo";
import Button from "./Button";
// import Form from "./Form";
// import Cities from "./Cities";
// import Countries from "./Countries";
import { NavLink, Outlet } from "react-router-dom";
import Map from "./Map";
import User from "./User";

export default function MainApp() {
  return (
    <section className={styles.container}>
      <main className={styles.main}>
        <User />
        <aside className={styles.aside}>
          <Logo />
          <div className={styles.upperBtnContainer}>
            <NavLink to={`cities`}>
              <Button type={`tabComponent`}>cities </Button>
            </NavLink>

            <NavLink to={`countries`}>
              <Button type={`tabComponent`}>countries</Button>
            </NavLink>
          </div>

          <Outlet />
          {/* <Form /> */}
          {/* <Cities /> */}
          {/* <Countries /> */}
          <footer>
            <p>
              &copy; Copyright {new Date().getFullYear()} by Olanrewaju Qudus
            </p>
          </footer>
        </aside>
        <Map />
      </main>
    </section>
  );
}
