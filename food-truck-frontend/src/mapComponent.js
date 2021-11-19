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
  
  static defaultProps = {
    center: {
      lat: 31.547164416064646,
      lng: -97.11819049760257
    }
  }

  constructor(props){
    super(props);
    this.state = { center: this.props.center };
  }

  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk">
        <GoogleMap mapContainerStyle={containerStyle}
                    center={this.state.center}
                    zoom={10} >
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default MapComponent