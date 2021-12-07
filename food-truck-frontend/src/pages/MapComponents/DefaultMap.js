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
    this.state = { center: { lat: 31.547164416064646, lng: -97.11819049760257 } }
    this.renderMarkers = this.renderMarkers.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  renderMarkers(marker, index){
    console.log(marker);
    const position = { lat: marker.latitude, lng: marker.longitude };
    return(
      <Marker position={position}/>
    );
  }

  componentDidMount(){
    if(this.props.markers.length > 0){
      console.log("Here");
      const position = { lat: this.props.markers[0].latitude, lng: this.props.markers[0].longitude };
      this.setState({
        center: position
      });
    }
  }

  render() {
    return (
      <LoadScript googleMapsApiKey={APICode} libraries={["places"]}>
        <GoogleMap mapContainerStyle={this.props.containerStyle} 
          center={this.state.center} zoom={10}>
          {this.props.markers.map(this.renderMarkers)}
        </GoogleMap>
      </LoadScript>
    )
  }
}



export default DefaultMap;