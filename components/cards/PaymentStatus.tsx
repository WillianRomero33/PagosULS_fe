import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View, useWindowDimensions } from "react-native";
import tw from "twrnc";

const PaymentStatus = () => {
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
          Estatus del Pago
        </Text>
      </View>

      <View style={tw`p-4`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <MaterialCommunityIcons
              name="file-document-edit"
              size={isMobile ? 16 : 20}
              color="#4b5563"
              style={tw`mr-2`}
            />
            <Text
              style={tw`text-gray-600 ${isMobile ? "text-sm" : "text-base"}`}
            >
              Matrícula
            </Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text
              style={tw`text-gray-800 ${
                isMobile ? "text-sm" : "text-base"
              } mr-2`}
            >
              $150.00
            </Text>
            <View style={tw`bg-yellow-100 px-2 py-1 rounded-full`}>
              <Text style={tw`text-yellow-800 text-xs`}>Pendiente</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentStatus;
