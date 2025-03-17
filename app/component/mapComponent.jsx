"use client"; // Required for Next.js App Router

import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 23.810331,
  lng: 90.412521,
};

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState(center);
  const [searchBox, setSearchBox] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error)
      );
    }
  }, []);

  // Handle place selection from search
  const onPlaceSelected = () => {
    if (searchBox) {
      const place = searchBox.getPlace();
      if (place?.geometry?.location) {
        setMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBwgxa6L70LB-4-X-nttzwiPBSpqwuxgYM"
      libraries={["places"]}
    >
      <div className="w-full flex flex-col items-center gap-4">
        <Autocomplete onLoad={setSearchBox} onPlaceChanged={onPlaceSelected}>
          <input
            type="text"
            placeholder="Search for a place..."
            className="border p-2 rounded w-80"
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={14}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapComponent;
