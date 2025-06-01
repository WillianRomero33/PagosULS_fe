import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Text, View, ScrollView, useWindowDimensions } from "react-native";
import tw from "twrnc";
import { useUser } from "../../Utils/UserContext";

const Profile = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 375;
  const { userData } = useUser();

  return (
    <ScrollView
      contentContainerStyle={tw`flex-grow bg-gray-100 justify-center p-0`}
    >
      <View style={tw`bg-white rounded-lg shadow-md overflow-hidden mx-2 my-4`}>
        <View style={tw`bg-[#003366] px-4 py-3`}>
          <Text
            style={tw`text-white ${
              isSmallScreen ? "text-base" : "text-md"
            } font-bold text-center`}
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            Perfil del Estudiante
          </Text>
        </View>

        <View style={tw`p-4`}>
          <View style={tw`items-center mb-4`}>
            <Ionicons
              name="person-circle-outline"
              size={isSmallScreen ? 50 : 80}
              color="#003366"
              style={tw`mb-3`}
            />

            <Text
              style={tw`${
                isSmallScreen ? "text-md" : "text-lg"
              } font-bold text-center`}
              numberOfLines={3}
              adjustsFontSizeToFit
            >
              {`${userData.firstName} ${userData.lastName.split(" ")[0]}`}
            </Text>
          </View>

          <View style={tw`space-y-4`}>
            <View style={tw`items-center mb-4`}>
              <FontAwesome5
                name="id-card"
                size={isSmallScreen ? 15 : 25}
                color="#003366"
                style={tw`mb-2`}
              />
              <Text
                style={tw`text-gray-600 ${
                  isSmallScreen ? "text-sm" : "text-base"
                } text-center`}
              >
                Carnet Universitario
              </Text>
              <Text
                style={tw`${
                  isSmallScreen ? "text-xs" : "text-sm"
                } font-semibold text-center`}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {userData.carnet}
              </Text>
            </View>

            <View style={tw`items-center`}>
              <FontAwesome5
                name="graduation-cap"
                size={isSmallScreen ? 15 : 25}
                color="#003366"
                style={tw`mb-2`}
              />
              <Text
                style={tw`text-gray-600 ${
                  isSmallScreen ? "text-sm" : "text-base"
                } text-center`}
              >
                Carrera
              </Text>
              <Text
                style={tw`${
                  isSmallScreen ? "text-xs" : "text-sm"
                } font-semibold text-center`}
                numberOfLines={4}
              >
                {userData.career}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
