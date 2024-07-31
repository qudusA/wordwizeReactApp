import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useReducer } from "react";

const CityContext = createContext();

const BASE_URL = "http://localhost:8000/cities";

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/Loaded":
      return { ...state, isLoading: false, data: action.payload };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        cityDetails: state.data.find((city) => city.id === action.payload),
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        data: state.data.filter((city) => city.id !== action.payload),
      };
    case "city/added":
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
        cityDetails: action.payload,
      };

    default:
      throw new Error("Unknown action payload...");
  }
}

const initialState = {
  data: [],
  isLoading: false,
  cityDetails: {},
};

function CityContextProvider({ children }) {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [cityDetails, setCityDetails] = useState({});

  const [{ data, isLoading, cityDetails }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        dispatch({ type: "cities/Loaded", payload: data });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const fetchACity = useCallback(async function fetchACity(cityId) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities`);
      await res.json();
      dispatch({ type: "city/loaded", payload: cityId });
    } catch (error) {
      console.log(error);
    }
  }, []);

  async function deleteSelectedCity(selectedCityId) {
    try {
      dispatch({ type: "loaded" });
      await fetch(`${BASE_URL}/${selectedCityId}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: selectedCityId });
    } catch (error) {
      console.log(error);
    }
  }

  // function formatDate(date) {
  //   return Intl.DateTimeFormat("en", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //     weekday: "long",
  //   }).format(new Date(date));
  // }

  const flagemojiToPNG = (flag) => {
    // var countryCode = Array.from(flag, (codeUnit) => {
    //   console.log("png", codeUnit, codeUnit.codePointAt());
    //   return codeUnit.codePointAt();
    // })
    //   .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    //   .join("");
    // console.log("code", countryCode);
    return (
      <img
        src={`https://flagcdn.com/24x18/${flag?.toLowerCase()}.png`}
        alt="flag"
      />
    );
  };

  async function addFormDataToCityList(formData) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const jsonData = await res.json();
      dispatch({ type: "city/added", payload: jsonData });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CityContext.Provider
      value={{
        fetchedData: data,
        isLoading,
        fetchACity,
        cityDetails,
        flagemojiToPNG,
        addFormDataToCityList,
        deleteSelectedCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

CityContextProvider.propTypes = {
  children: PropTypes.any,
};

// function useCityContext() {
//   const val = useContext(CityContext);
//   if (val === undefined)
//     // throw new Error("this context is used outside of child element...");
//     return val;
// }

export { CityContextProvider, CityContext };
