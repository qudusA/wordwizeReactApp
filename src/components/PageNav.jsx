import { NavLink } from "react-router-dom";
import styles from "./pageNav.module.css";
import Logo from "./Logo";
export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <div>
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
      </div>

      <ul className={styles.navLink}>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/login"}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
