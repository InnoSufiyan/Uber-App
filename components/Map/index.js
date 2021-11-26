import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { selectOrigin } from "../../slices/navSlice";
import { selectDestination } from "../../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef, useEffect } from "react";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null)

  useEffect(()=> {
      if (!origin || !destination) return;

      mapRef?.current?.fitToSuppliedMarkers(["origin","destination"], {
          edgePadding: { top:50, right:50, bottom:50, left:50 },
      });

  }, [origin, destination])

  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location?.lat,
        longitude: origin?.location?.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          lineDashPattern={[0]}
          origin={origin?.description}
          destination={destination?.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title={"Expertizo University"}
          // description= {origin.description}
          // identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title={"Expertizo University"}
          // description= {origin.description}
          // identifier="origin"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
