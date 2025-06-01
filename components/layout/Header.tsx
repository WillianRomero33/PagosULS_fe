import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import tw from "@/Utils/tw";

type HeaderProps = {
  userName?: string;
  isLoggedIn?: boolean;
};

const Header = ({ userName = "Willian Romero", isLoggedIn = false }: HeaderProps) => {
  return (
    <View style={[tw`bg-[#003366] py-4 px-4`, styles.header]}>
      <View style={tw`flex-row justify-between items-center mb-2`}>
        <Image
          source={require("../../assets/images/ULS.png")}
          style={tw`w-40 h-12 bg-white rounded-lg`}
          resizeMode="contain"
        />

      {isLoggedIn && (
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-white mr-2 text-sm`}>{userName}</Text>
            <TouchableOpacity>
              <Ionicons name="person-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={tw`items-center`}>
        <Text style={tw`text-white text-lg font-bold text-center`}>
          UNIVERSIDAD LUTERANA SALVADOREÑA
        </Text>
        <Text style={tw`text-gray-200 text-sm italic text-center mt-1`}>
          Sistema de pagos para estudiantes de la ULS
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: 40,
    paddingBottom: 12,
  },
});

export default Header;
