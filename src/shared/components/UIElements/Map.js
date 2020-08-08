import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';

const Map = props => {
  const mapRef = useRef();

  const { center, zoom } =props;

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFjMmRhbGV0IiwiYSI6ImNrZGw3NTk5bDAwOTgzM3FuZHF1OG5hOWUifQ.n7RNI7y39wkyUkzdfrHQiw';
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: zoom,
    });
    // new mapboxgl.Marker({ position: center, map: map });
    new mapboxgl.Marker().setLngLat(center).addTo(map);
  }, [center, zoom]);

  return (
    <div ref={mapRef} className={`map ${props.className}`} style={props.style}>

    </div>
  )
};

export default Map;