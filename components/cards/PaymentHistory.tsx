import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import tw from "twrnc";

interface PaymentRecord {
  date: string;
  concept: string;
  amount: number;
  status: "Pagado" | "Pendiente";
}

interface CycleHistory {
  [key: string]: PaymentRecord[];
}

const PaymentHistory = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  const [selectedCycle, setSelectedCycle] = useState("I - 2024");
  const [showCyclePicker, setShowCyclePicker] = useState(false);

  // Configuración de prueba
  const testDueDate = new Date();
  testDueDate.setDate(testDueDate.getDate() + 6); // 6 días restantes (verde)

  const today = new Date();
  const diffTime = testDueDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const availableCycles = ["I - 2024", "II - 2024", "I - 2023", "II - 2023"];

  const paymentData = {
    amount: 125.0,
    concept: "Mensualidad Abril",
    dueDate: "15/04/2024",
  };

  const cycleHistoryData: CycleHistory = {
    "I - 2024": [
      {
        date: "15/03/2024",
        concept: "Mensualidad Marzo",
        amount: 125.0,
        status: "Pagado",
      },
      // ... (resto de los datos se mantienen igual)
    ],
    // ... (otros ciclos se mantienen igual)
  };

  const getStatusColor = () => {
    if (daysLeft <= 0) return "bg-red-100 border-red-300";
    if (daysLeft <= 5) return "bg-yellow-100 border-yellow-300";
    return "bg-green-100 border-green-300";
  };

  return (
    <View style={tw`flex-1 px-3`}>
      {/* Sección de Próximo Pago - Rediseñada para móvil */}
      <View style={tw`bg-white rounded-lg shadow-md overflow-hidden mb-4`}>
        <View style={tw`bg-[#003366] px-4 py-3`}>
          <Text style={tw`text-white text-lg font-bold`}>Próximo Pago</Text>
        </View>

        <View style={tw`p-4 ${getStatusColor()} border-l-4`}>
          <Text style={tw`text-lg font-semibold mb-2`}>
            {paymentData.concept}
          </Text>

          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-2xl font-bold`}>
              ${paymentData.amount.toFixed(2)}
            </Text>
            <Text
              style={tw`font-medium ${
                daysLeft <= 0
                  ? "text-red-600"
                  : daysLeft <= 5
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {daysLeft <= 0 ? "Vencido" : `${daysLeft} días restantes`}
            </Text>
          </View>

          <View style={tw`flex-row items-center`}>
            <MaterialIcons
              name="calendar-today"
              size={16}
              color="#4b5563"
              style={tw`mr-2`}
            />
            <Text style={tw`text-gray-600`}>Vence: {paymentData.dueDate}</Text>
          </View>
        </View>
      </View>

      {/* Sección de Historial */}
      <View
        style={tw`bg-white rounded-lg shadow-md overflow-hidden flex-1 mb-4`}
      >
        <View
          style={tw`flex-row justify-between items-center bg-[#003366] px-4 py-3`}
        >
          <Text style={tw`text-white text-lg font-bold`}>Historial</Text>

          <TouchableOpacity
            style={tw`flex-row items-center bg-white rounded-full px-3 py-1`}
            onPress={() => setShowCyclePicker(true)}
          >
            <Text
              style={tw`text-gray-700 mr-1 ${
                isSmallScreen ? "text-sm" : "text-base"
              }`}
            >
              {selectedCycle}
            </Text>
            <AntDesign name="down" size={12} color="#4b5563" />
          </TouchableOpacity>
        </View>

        {/* Modal del Picker */}
        <Modal visible={showCyclePicker} transparent animationType="fade">
          <Pressable
            style={tw`flex-1 justify-center items-center bg-black/50`}
            onPress={() => setShowCyclePicker(false)}
          >
            <View style={tw`bg-white rounded-lg w-5/6 max-w-md`}>
              <Text style={tw`text-lg font-bold p-4 border-b border-gray-200`}>
                Seleccionar Ciclo
              </Text>
              <ScrollView style={tw`max-h-60`}>
                {availableCycles.map((cycle) => (
                  <Pressable
                    key={cycle}
                    style={tw`py-3 px-4 border-b border-gray-100`}
                    onPress={() => {
                      setSelectedCycle(cycle);
                      setShowCyclePicker(false);
                    }}
                  >
                    <Text
                      style={tw`text-center ${
                        selectedCycle === cycle
                          ? "text-blue-600 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {cycle}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </Pressable>
        </Modal>

        {/* Lista de pagos */}
        <ScrollView>
          {(cycleHistoryData[selectedCycle] || []).map((item, index) => (
            <View key={index} style={tw`p-3 border-b border-gray-100`}>
              <View style={tw`flex-row justify-between mb-1`}>
                <Text
                  style={tw`font-medium flex-1`}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.concept}
                </Text>
                <Text style={tw`text-gray-500 ml-2`}>{item.date}</Text>
              </View>

              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`font-bold`}>${item.amount.toFixed(2)}</Text>
                <View
                  style={tw`rounded-full px-2 py-1 ${
                    item.status === "Pagado" ? "bg-green-100" : "bg-yellow-100"
                  }`}
                >
                  <Text
                    style={tw`text-xs ${
                      item.status === "Pagado"
                        ? "text-green-800"
                        : "text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default PaymentHistory;
