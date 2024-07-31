import { useContext } from "react";
import styles from "./countries.module.css";
import PropTypes from "prop-types";
import { CityContext } from "../contexts/CityContextProvider";
export default function Countries() {
  const { fetchedData } = useContext(CityContext);
  const countries = fetchedData.reduce((acc, cur) => {
    if (!acc.map((city) => city.country).includes(cur.country)) {
      return [...acc, { emoji: cur.emoji, country: cur.country, id: cur.id }];
    } else {
      return acc;
    }
  }, []);

  return (
    <ul className={styles.ul}>
      {countries?.map((city) => (
        <CountryList key={city.id} city={city} />
      ))}
    </ul>
  );
}

function CountryList({ city }) {
  const { flagemojiToPNG } = useContext(CityContext);

  return (
    <li className={styles.list}>
      <p>
        <span>{flagemojiToPNG(city.emoji)}</span>
      </p>
      <p>
        <span>{city.country}</span>
      </p>
    </li>
  );
}

CountryList.propTypes = {
  city: PropTypes.any,
  // fetchedData: PropTypes.array
};

Countries.propTypes = {
  // city: PropTypes.any,
  fetchedData: PropTypes.array,
};
