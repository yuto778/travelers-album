"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

const center = {
  lat: 35.6812362,
  lng: 139.7671248, // 東京駅の座標
};

export interface LocationInfo {
  lat: number;
  lng: number;
  address: string;
  name: string;
}

interface MapProps {
  onLocationSelect: (location: LocationInfo) => void;
}

const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(
    null
  );

  const handleMarkerClick = useCallback(
    (markerPosition: google.maps.LatLngLiteral) => {
      const geocoder = new google.maps.Geocoder();
      const placesService = new google.maps.places.PlacesService(map!);

      geocoder.geocode({ location: markerPosition }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          const address = results[0].formatted_address;

          const request = {
            location: markerPosition,
            radius: 100,
            type: "point_of_interest",
          };

          placesService.nearbySearch(request, (placeResults, placeStatus) => {
            if (
              placeStatus === google.maps.places.PlacesServiceStatus.OK &&
              placeResults
            ) {
              const name = placeResults[0]?.name || "不明な場所";
              onLocationSelect({
                lat: markerPosition.lat,
                lng: markerPosition.lng,
                address,
                name,
              });
            } else {
              console.error("Places nearby search failed:", placeStatus);
            }
          });
        } else {
          console.error("Geocoding failed:", status);
        }
      });
    },
    [map]
  );

  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const newMarker = event.latLng.toJSON();
        setMarker(newMarker);
        handleMarkerClick(newMarker);
      }
    },
    [handleMarkerClick]
  );

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  if (!isLoaded)
    return (
      <div className="size-44 w-full flex items-center justify-center">
        <div className=" font-bold text-3xl ">Loading...</div>
      </div>
    );

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {marker && (
          <Marker position={marker} onClick={() => handleMarkerClick(marker)} />
        )}
      </GoogleMap>
    </>
  );
};

export default Map;
