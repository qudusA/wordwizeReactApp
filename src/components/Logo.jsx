import styles from "./logo.module.css";
import logo from "../logo.png";

export default function Logo() {
  return <img className={styles.logo} src={logo} alt="site logo" />;
}
