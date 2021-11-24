import React, { Component } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk");
Geocode.setLanguage("en");

const containerStyle = {
  width: '400px',
  height: '400px'
};

class DefaultMap extends Component {
  
  constructor (props) {
    super(props)

    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)
  }

  onLoad (autocomplete) {
    console.log('autocomplete: ', autocomplete)

    this.autocomplete = autocomplete
  }

  onPlaceChanged () {
    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk" libraries={["places"]}>
        <GoogleMap mapContainerStyle={containerStyle}
                    center={{lat: 31.547164416064646, lng: -97.11819049760257}}
                    zoom={10} >
        </GoogleMap>
        { /* Child components, such as markers, info windows, etc. */ }
      </LoadScript>
    )
  }
}

export default DefaultMap;