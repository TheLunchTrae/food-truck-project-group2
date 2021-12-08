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
    markers: [],
    nearbyTrucks: []
}

  constructor (props) {
    super(props)
    this.state = { locations: [] }
    this.renderMarkers = this.renderMarkers.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setNearbyLocations = this.setNearbyLocations.bind(this);
  }

  renderMarkers(marker, index){
    console.log(marker);
    const position = { lat: marker.latitude, lng: marker.longitude };
    return(
      <Marker position={position}/>
    );
  }

  setNearbyLocations(truck, index){
    var locations = [];
    console.log("Index: " + index)
    console.log(truck);
    for(let i = 0; i < truck.route.length; ++i){
      const position = { lat: truck.route[i].latitude, lng: truck.route[i].longitude };
      locations.push(
        <Marker position={position} label={truck.truckName}/>
      );
    }
    return locations;
  }

  componentDidMount(){
    console.log(this.props.markers);
    if(this.props.markers.length > 0){
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
          center={this.props.center} zoom={10}>
          {this.props.markers.map(this.renderMarkers)}
          {this.props.nearbyTrucks.map(this.setNearbyLocations)}
        </GoogleMap>
      </LoadScript>
    )
  }
}



export default DefaultMap;