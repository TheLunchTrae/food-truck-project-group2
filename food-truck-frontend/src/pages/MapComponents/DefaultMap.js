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
    this.state = { markers: [] };
    this.addMarker = this.addMarker.bind(this);

  }

  addMarker(lat, lng){
    const marker = { lat, lng };
    var newMarkers = this.state.markers;
    newMarkers.push(marker);
    this.setState({
      ['markers']: newMarkers
    });
  }

  renderMarkers(marker){
    const position = { lat: marker.lat, lng: marker.lng };
    return(
      <Marker position={position}/>
    );
  }

  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk" libraries={["places"]}>
        <GoogleMap mapContainerStyle={containerStyle}
                    center={{lat: 31.547164416064646, lng: -97.11819049760257}}
                    zoom={10} >
        </GoogleMap>
        {this.state.markers.length != 0 ? this.state.markers.map(renderMarkers) : null}
      </LoadScript>
    )
  }
}

export default DefaultMap;