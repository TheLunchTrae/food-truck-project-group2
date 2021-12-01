import React, { Component } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import Geocode from "react-geocode";
import styles from './RouteMap.module.scss'
import { StylesContext } from '@material-ui/styles';

Geocode.setApiKey("AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk");
Geocode.setLanguage("en");

const containerStyle = {
  width: '100%',
  height: '400px'
};

const libraries = ["places"];

class RouteMap extends Component {

  static defaultProps = {
    center: {lat: 31.547164416064646, lng: -97.11819049760257}
  }

  constructor (props) {
    super(props)
    this.state = { markers: [], buttonMenu: null };
    this.markerMenu = this.markerMenu.bind(this);
  }

  markerMenu(event){
    console.log(event);
    this.setState({
      ['buttonMenu']: null
    });
  }

  renderMarkers(marker){
    const position = { lat: marker.lat, lng: marker.lng };
    return(
      <Marker position={position}/>
    );
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyAFiDEFB5H7qlYn-LeipCsfkCYt-nm4AGk" libraries={libraries}>
        <GoogleMap id="map" mapContainerStyle={containerStyle} center={this.props.center} zoom={10} 
                      onRightClick={this.markerMenu}>
        </GoogleMap>
        {this.state.buttonMenu}
        {this.state.markers.length != 0 ? this.state.markers.map(renderMarkers) : null}
      </LoadScript>
    )
  }
}

export default RouteMap;