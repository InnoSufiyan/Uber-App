import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "twrnc";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selecttravelTimeInformation } from "../../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
    timeTravel: 5
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
    timeTravel: 2
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
    timeTravel: 0
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionCard = ({ navigation }) => {
    const [selected, setSelected] = useState(null)
    const travelTimeInformation = useSelector(selecttravelTimeInformation)
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <ScrollView>
        <View>
          <TouchableOpacity
            style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
            onPress={() => navigation.navigate("NavigateCard")}
          >
            <Icon name="chevron-left" type="fontawesome" />
          </TouchableOpacity>
          <Text style={tw`text-center py-1 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image, timeTravel }, item }) => (
            <TouchableOpacity style={tw `flex flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
            onPress={()=> setSelected(item)}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={{
                  uri: image,
                }}
              />
              <View style={tw `-ml-6`}>
                  <Text style={tw `text-xl font-semibold`}>{title}</Text>
                  <Text>{travelTimeInformation?.duration?.text} </Text>
              </View>
              <Text style={tw `text-xl`}>
                  Rs {Math.round(travelTimeInformation?.duration?.value * 0.3 * SURGE_CHARGE_RATE * multiplier)}
              </Text>
            </TouchableOpacity>
          )}
        />
        
        <View>
            <TouchableOpacity
            disabled={!selected}
            style={tw `bg-black py-4 m-5 ${!selected && "bg-gray-300"}`}>
                <Text style={tw `text-white text-center text-xl`}>
                    Choose {selected?.title}
                </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideOptionCard;

const styles = StyleSheet.create({});
