import { useState } from "react";

export default function useGeolocation() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState([]);

  function getCurrentPosition() {
    setIsLoading((bol) => !bol);
    // console.log(isLoading);

    if (!navigator.geolocation)
      return setError("your browser does not support geoloctaion..");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading((bol) => !bol);
      },
      (error) => {
        setError(error.message);
        setIsLoading((bol) => !bol);
      }
    );
  }

  return { position, error, getCurrentPosition, isLoading };
}
