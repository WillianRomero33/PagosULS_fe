import { useWindowDimensions, View, ScrollView } from "react-native";
import tw from "@/Utils/tw";
import Header from "../../components/layout/Header";
import PaymentHistory from "@/components/cards/PaymentHistory";
import PaymentStatus from "@/components/cards/PaymentStatus";
import StudentInfo from "@/components/cards/StudentInfo";

export default function Dashboard() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header />

      {isMobile ? (
        <ScrollView contentContainerStyle={tw`pb-4 mt-5`}>
          <StudentInfo />
          <PaymentStatus />
          <PaymentHistory />
        </ScrollView>
      ) : (
        <View style={tw`flex-row p-4 gap-4`}>
          {/* Columna izquierda */}
          <View style={tw`w-1/3`}>
            <StudentInfo />
            <PaymentStatus />
          </View>

          {/* Columna derecha */}
          <View style={tw`w-2/3`}>
            <PaymentHistory />
          </View>
        </View>
      )}
    </View>
  );
}
