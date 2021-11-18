import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk");
Geocode.setLanguage("en");

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

class MapComponent extends Component {
  constructor(props){
    super();
    this.setState()
  }
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default MapComponent