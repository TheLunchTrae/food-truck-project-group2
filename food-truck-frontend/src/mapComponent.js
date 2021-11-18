import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk");
Geocode.setLanguage("en");

const containerStyle = {
  width: '400px',
  height: '400px'
};

class MapComponent extends Component {
  constructor(props){
    super();
    this.state = { center: { lng: 0.000, lat: 0.000} }

  }
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.state.center}
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