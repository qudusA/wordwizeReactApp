import styles from "./cities.module.css";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { CityContext } from "../contexts/CityContextProvider";
import { useContext } from "react";
export default function Cities() {
  // if (loadingSpiner) return <p>loading</p>;
  const { isLoading, fetchedData } = useContext(CityContext);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul className={styles.ul}>
          {fetchedData.map((city) => (
            <CityList city={city} key={city.id} />
          ))}
        </ul>
      )}
    </>
  );
}

// function formatDate(date) {
//   // console.log(date);
//   return Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));
// }

function CityList({ city }) {
  const { cityDetails, flagemojiToPNG, deleteSelectedCity } =
    useContext(CityContext);

  function handleDeleteCity(e) {
    e.preventDefault();
    // console.log("clicked", e);
    deleteSelectedCity(city.id);
    // return;
  }

  return (
    <li>
      <Link
        className={`${styles.list} ${
          cityDetails.id === city.id ? styles["cityItems--active"] : ""
        }`}
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
      >
        <p>
          <span>{flagemojiToPNG(city.emoji)}</span>
          <span>{city.cityName}</span>
        </p>
        <p>
          <span>({city.date})</span>
          <span onClick={handleDeleteCity} className={styles.remove}>
            &times;
          </span>
        </p>
      </Link>
    </li>
  );
}

CityList.propTypes = {
  city: PropTypes.any,
};

Cities.propTypes = {
  fetchedData: PropTypes.array,
  loadingSpiner: PropTypes.bool,
};
