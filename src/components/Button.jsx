import PropTypes from "prop-types";
import styles from "./Button.module.css";

export default function Button({ children, type, onClick }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.any,
  onClick: PropTypes.func,
};
