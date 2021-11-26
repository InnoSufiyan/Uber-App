import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination } from "../../slices/navSlice";
import NavFavourites from "../../components/NavFavourites";

import { useDispatch } from "react-redux";

import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`py-2 text-center text-xl`}>Have a Nice Ride..!</Text>
      <Text style={tw`py-2 text-center text-xl`}>Select Your Destination..!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to"
            styles={toInputBoxStyles}
            fetchDetails={true}
            enablePoweredByContainer={false}
            returnKeyType="search"
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              // navigation.navigate("RideOptionCard")
            }}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`bg-white flex flex-row justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tw`w-24 bg-black flex flex-row justify-between py-3 px-4 rounded-full`}
          onPress={()=> navigation.navigate("RideOptionCard")}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-24 bg-white flex flex-row justify-between py-3 px-4 rounded-full`}
        >
          <Icon name="apple" type="font-awesome" color="black" size={16} />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
