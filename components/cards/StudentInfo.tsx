import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Text, View, useWindowDimensions } from "react-native";
import tw from "twrnc";

const StudentInfo = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View
      style={tw`bg-white rounded-lg shadow-md mb-4 ${
        isMobile ? "mx-2" : "w-full"
      }`}
    >
      <View style={tw`bg-[#003366] px-4 py-3`}>
        <Text
          style={tw`text-white ${
            isMobile ? "text-base" : "text-lg"
          } font-bold text-center`}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          Información del Estudiante
        </Text>
      </View>

      <View style={tw`p-4`}>
        <View
          style={tw`flex-row items-center justify-between py-2 border-b border-gray-100`}
        >
          <View style={tw`flex-row items-center`}>
            <FontAwesome5
              name="id-card"
              size={isMobile ? 16 : 20}
              color="#4b5563"
              style={tw`mr-2`}
            />
            <Text
              style={tw`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}
            >
              Carnet
            </Text>
          </View>
          <Text style={tw`text-gray-800 ${isMobile ? "text-sm" : "text-base"}`}>
            RA01137239
          </Text>
        </View>

        <View
          style={tw`flex-row items-center justify-between py-2 border-b border-gray-100`}
        >
          <View style={tw`flex-row items-center`}>
            <FontAwesome5
              name="graduation-cap"
              size={isMobile ? 16 : 20}
              color="#4b5563"
              style={tw`mr-2`}
            />
            <Text
              style={tw`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}
            >
              Carrera
            </Text>
          </View>
          <Text style={tw`text-gray-800 ${isMobile ? "text-sm" : "text-base"}`}>
            Lic. en Ciencias de la Computación
          </Text>
        </View>

        <View style={tw`flex-row items-center justify-between py-2`}>
          <View style={tw`flex-row items-center`}>
            <MaterialIcons
              name="date-range"
              size={isMobile ? 16 : 20}
              color="#4b5563"
              style={tw`mr-2`}
            />
            <Text
              style={tw`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}
            >
              Ciclo Actual
            </Text>
          </View>
          <Text style={tw`text-gray-800 ${isMobile ? "text-sm" : "text-base"}`}>
            I - 2024
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StudentInfo;
