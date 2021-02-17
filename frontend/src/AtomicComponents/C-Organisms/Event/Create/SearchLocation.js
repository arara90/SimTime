/*global kakao*/
import React, { useState, useCallback, Fragment, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { searchPlaces } from "../../../../redux/actions/mapApi";
import SearchBar from "../../../B-Molecules/Form/SearchBar";
import Map from "../../../A-Atomics/Map/Map";
import ContextStore from "../../../../contexts/contextStore";
import {
  MAIN_COLOR,
  ST_GTAY,
  ST_SEMI_YELLOW,
  ST_YELLOW_LIGHT,
} from "../../../Colors";

const Wrap = styled.div`
  width: 100%;
`;
const MySearchBar = styled(SearchBar)`
  margin-bottom: 15px;
`;

const StyledMap = styled(Map)``;

function SearchLocation(props) {
  const { width, height, mapId } = props;
  const [location, setLocation] = useState({ lat: 0, lng: 0, name: "현위치", address:"" });

  //현재 위치 얻어오기
  useEffect(() => {
    function success(position) {
      const curr = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        name: "현위치",
      };

      setLocation(curr);
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      var a = navigator.geolocation.getCurrentPosition(success, () => {
        console.log("Unable to retrieve your location");
      });
    }
  }, []);

  const saveLocation = (option) => {
    console.log('op', option)
    const data = {
      lat: parseFloat(option.lat),
      lng: parseFloat(option.lan),
      name: option.name,
      address: option.address
    }

    setLocation(data);
    props.onChange(data);
  };

  return (
    <Wrap {...props}>
      <MySearchBar
        label="Place"
        name={props.name}
        desc="Event Place"
        width="100%"
        search={searchPlaces}
        doAfterSelect={saveLocation}
      />
      <StyledMap
        width="100%"
        height="164px"
        mapId={props.mapId}
        name={location.name}
        lng={location.lng}
        lat={location.lat}
        location={location}
      ></StyledMap>
    </Wrap>
  );
}

export default SearchLocation;

SearchLocation.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  mapId: PropTypes.string,
};

SearchLocation.defaultProps = {
  width: "100%",
  height: "40px",
  mapId: "eventMakerMap",
};
