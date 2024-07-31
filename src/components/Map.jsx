import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./map.module.css";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useContext, useEffect, useState } from "react";
import { CityContext } from "../contexts/CityContextProvider";
import PropTypes from "prop-types";
import useGeolocation from "../hooks/useGeolocation";
import Button from "./Button";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { position, getCurrentPosition, isLoading } = useGeolocation();

  const [
    searchParams,
    // setSearchParams
  ] = useSearchParams();
  const myLat = searchParams.get("lat");
  const myLng = searchParams.get("lng");

  useEffect(() => {
    async function rememberMapPos() {
      if (myLat && myLng) setMapPosition([myLat, myLng]);
    }
    rememberMapPos();
  }, [myLat, myLng]);

  useEffect(() => {
    if (position.length !== 0) setMapPosition([position[0], position[1]]);
  }, [position]);

  const { fetchedData } = useContext(CityContext);

  //   const { cityId } = useParams();

  return (
    <div className={styles.mapContainer}>
      {position.length === 0 && (
        <Button
          type="position"
          onClick={() => {
            console.log("clicked");
            return getCurrentPosition();
          }}
        >
          {isLoading ? "Loading...." : "Get your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[myLat || 40, myLng || 0]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {fetchedData.map((city) => {
          return (
            <Marker
              position={[city.position?.lat, city.position?.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClickedPoint />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClickedPoint() {
  const navigate = useNavigate();
  // if(!)
  useMapEvent({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e?.latlng?.lat}&lng=${e?.latlng?.lng}`);
    },
  });
}

ChangeCenter.propTypes = {
  position: PropTypes.any,
};
