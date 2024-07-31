import { useNavigate, useParams } from "react-router-dom";
import styles from "./cityDetails.module.css";
import { useContext, useEffect } from "react";
import Button from "./Button";
import Spinner from "./Spinner";
import { CityContext } from "../contexts/CityContextProvider";
// import { CityContext } from "../contexts/CityContextProvider";

export default function CityDetails() {
  const navigate = useNavigate();

  const { cityId } = useParams();
  const { fetchACity, cityDetails, isLoading, flagemojiToPNG } =
    useContext(CityContext);
  // const { fetchedData } = useContext(CityContext);
  // const [
  //   searchParams,
  //   // setSearchParams
  // ] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  // useEffect(() => {
  //   const data = fetchedData.find((city) => city.id === +cityId);
  //   // const res = { ...data, date: formatDate(data.date) };
  // }, [cityId, fetchedData]);

  useEffect(() => {
    // console.log(cityId);
    fetchACity(cityId);
  }, [cityId, fetchACity]);

  if (isLoading) return <Spinner />;

  return (
    <article className={styles.container}>
      <div className={styles.innerContainer}>
        <p>
          <span>city name</span>
          <span className={styles.upper}>
            {flagemojiToPNG(cityDetails?.emoji)} {cityDetails?.cityName}
          </span>
        </p>
        <p>
          <span>you went to {cityDetails?.cityName} on</span>
          <span>{cityDetails.date}</span>
        </p>
        <p>
          <span>your notes</span>
          <span>{cityDetails.notes}</span>
        </p>
        <p>
          <span>learn more</span>
          <span className={styles.last}>
            check out {cityDetails.cityName} on wikipedia &rarr;
          </span>
        </p>
        <div>
          <Button onClick={() => navigate(-1)} type={`backBtn`}>
            &larr; Back
          </Button>
        </div>
      </div>
    </article>
  );
}
