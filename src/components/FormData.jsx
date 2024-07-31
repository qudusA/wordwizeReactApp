import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";
import styles from "./form.module.css";
import { useContext, useEffect, useState } from "react";
import Spinner from "./Spinner";
import { CityContext } from "../contexts/CityContextProvider";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
// function convertCountryCodeToFlag(countryCode) {
//   const codePoints = countryCode
//     .toUpperCase()
//     .split("")
//     .map((char) => 127397 + char.charCodeAt());
//   // console.log(codePoints);
//   // console.log("char code", String.fromCharCode(...codePoints));
//   console.log("code point", String.fromCodePoint(...codePoints));
//   return String.fromCodePoint(...codePoints);
// }

// const flagemojiToPNG = (flag) => {
//   // var countryCode = Array.from(flag, (codeUnit) => {
//   //   console.log("png", codeUnit, codeUnit.codePointAt());
//   //   return codeUnit.codePointAt();
//   // })
//   //   .map((char) => String.fromCharCode(char - 127397).toLowerCase())
//   //   .join("");
//   // console.log("code", countryCode);
//   return (
//     <img
//       src={`https://flagcdn.com/24x18/${flag.toLowerCase()}.png`}
//       alt="flag"
//     />
//   );
// };

export default function FormData() {
  const [date, setDate] = useState("");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [note, setNote] = useState("");
  const [geocodeError, setGeocodeError] = useState("");
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [searchParams] = useSearchParams();

  const { flagemojiToPNG, addFormDataToCityList, isLoading } =
    useContext(CityContext);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    const dateObj = new Date().toDateString();
    // const dateVal = Intl.DateTimeFormat("en", {
    //   day: "numeric",
    //   month: "long",
    //   year: "numeric",
    //   weekday: "long",
    //   minute: "numeric",
    //   hour: "numeric",
    //   second: "numeric",
    // }).format(dateObj);
    setDate(dateObj);
  }, [lat, lng]);

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchGeoCoding() {
      try {
        setGeocodeError("");
        setIsLoadingGeocode(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        // console.log(data);

        if (!data.countryName)
          throw new Error(
            "🤷‍♂️🤷‍♂️🤷‍♂️ That doesn't seems to be a country, 😒😒😒😒 it a middle of no where..."
          );
        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setEmoji(data.countryCode);
      } catch (error) {
        setGeocodeError(error.message);
      } finally {
        setIsLoadingGeocode(false);
      }
    }
    fetchGeoCoding();
  }, [lat, lng]);

  // useEffect(() => {}, []);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const val = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes: note,
      position: {
        lat,
        lng,
      },
    };
    // console.log("event", val);
    await addFormDataToCityList(val);
    navigate("/app/cities");
  }

  if (isLoadingGeocode) return <Spinner />;

  if (!lat && !lng) return <p>start by clicking on the map 😒😒😒😒</p>;

  if (geocodeError) return <p>{geocodeError}</p>;
  return (
    <div className={styles.formContainer}>
      <form
        className={`${styles.form} ${isLoading ? styles.grayOut : ""}`}
        action=""
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="cityName">City name</label>
          <input type="text" name="cityName" id="" value={cityName} readOnly />
          <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
        </div>
        <div>
          <label htmlFor="date">When did you go to {cityName}</label>
          <input type="text" name="date" id="" value={date} readOnly />
        </div>
        <div>
          <label htmlFor="comment">
            Note about your trip to {cityName} in {countryName}
          </label>
          <textarea
            name="comment"
            id=""
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.lowerBtnContainer}>
          <Button type="btn">add</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            type={`backBtn`}
          >
            &larr; Back
          </Button>
        </div>
      </form>
    </div>
  );
}
