import React, { Component } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk");
Geocode.setLanguage("en");

const containerStyle = {
  width: '400px',
  height: '400px'
};

class AutoCompleteMap extends Component {
  
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
        <Autocomplete
            onLoad={this.onLoad}
            onPlaceChanged={this.onPlaceChanged}
          >
            <input
              type="text"
              id="addressBox"
              placeholder="Address"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
                top: `-100%`
              }}
            />
          </Autocomplete>
      </LoadScript>
    )
  }
}

export default AutoCompleteMap;