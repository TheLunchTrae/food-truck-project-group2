import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Geocode from "react-geocode";

const APICode = "AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk"

Geocode.setApiKey(APICode);
Geocode.setLanguage("en");

class DefaultMap extends Component {

  static defaultProps = {
    containerStyle: { width: '400px', height: '400px'},
    center: { lat: 31.547164416064646, lng: -97.11819049760257 },
    markers: []
  }

  constructor (props) {
    super(props)
  }

  renderMarkers(marker){
    const position = { lat: marker.lat, lng: marker.lng };
    return(
      <Marker position={position}/>
    );
  }

  render(props) {
    return (
      <LoadScript googleMapsApiKey={APICode} libraries={["places"]}>
        <GoogleMap mapContainerStyle={props.containerStyle} center={props.center} zoom={10}>
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default DefaultMap;