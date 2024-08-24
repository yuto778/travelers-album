"use client";

import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
};

export interface LocationInfo {
  lat: number;
  lng: number;
  address: string;
  name: string;
}

interface MapProps {
  onLocationSelect: (location: LocationInfo) => void;
  pictureinfos: {
    id: string;
    tripcard_id: string;
    picture_url: string | null;
    take_at: Date | null;
    location_pointx: string;
    location_pointy: string;
  }[];
}

const Map: React.FC<MapProps> = ({ onLocationSelect, pictureinfos }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    libraries: ["places"],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);

  // 最初の座標をセンターとして使用
  const center =
    pictureinfos.length > 0
      ? {
          lat: parseFloat(pictureinfos[0].location_pointx),
          lng: parseFloat(pictureinfos[0].location_pointy),
        }
      : { lat: 35.6812362, lng: 139.7671248 }; // デフォルトの中心（東京駅）

  useEffect(() => {
    if (pictureinfos.length > 0) {
      const newMarkers = pictureinfos.map((info) => ({
        lat: parseFloat(info.location_pointx),
        lng: parseFloat(info.location_pointy),
      }));
      setMarkers(newMarkers);
    }
  }, [pictureinfos]);

  const handleMarkerClick = useCallback(
    (markerPosition: google.maps.LatLngLiteral) => {
      if (!map) return;

      const geocoder = new google.maps.Geocoder();
      const placesService = new google.maps.places.PlacesService(map);

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
    [map, onLocationSelect]
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
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
      onLoad={onMapLoad}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
