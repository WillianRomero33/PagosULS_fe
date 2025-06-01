import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import tw from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';

type PaymentItem = {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  type: 'matricula' | 'mensualidad' | 'otros';
};

type PaymentOptions = {
  [key: string]: PaymentItem[];
};

const PaymentSection = () => {
  // Ciclos académicos disponibles (año-semestre)
  const availableCycles = ["I-2024", "II-2024", "I-2023", "II-2023"] as const;
  type Cycle = typeof availableCycles[number];
  
  // Todos los conceptos de pago organizados por ciclo
  const allPaymentOptions: PaymentOptions = {
    "I-2024": [
      { id: 1, name: 'Matrícula', amount: 35.00, dueDate: '15/01/2024', type: 'matricula' },
      { id: 2, name: 'Mensualidad Enero', amount: 45.00, dueDate: '15/01/2024', type: 'mensualidad' },
      { id: 3, name: 'Uso Sala de Cómputo', amount: 16.00, dueDate: '15/01/2024', type: 'otros' },
      { id: 4, name: 'Papelería', amount: 15.00, dueDate: '15/01/2024', type: 'otros' },
      { id: 5, name: 'Mensualidad Febrero', amount: 45.00, dueDate: '15/02/2024', type: 'mensualidad' },
      { id: 6, name: 'Mensualidad Marzo', amount: 45.00, dueDate: '15/03/2024', type: 'mensualidad' },
      { id: 7, name: 'Mensualidad Abril', amount: 45.00, dueDate: '15/04/2024', type: 'mensualidad' },
      { id: 8, name: 'Mensualidad Mayo', amount: 45.00, dueDate: '15/05/2024', type: 'mensualidad' },
      { id: 9, name: 'Mensualidad Junio', amount: 45.00, dueDate: '15/06/2024', type: 'mensualidad' }
    ],
    "II-2024": [
      { id: 10, name: 'Matrícula', amount: 35.00, dueDate: '15/07/2024', type: 'matricula' },
      { id: 11, name: 'Mensualidad Julio', amount: 45.00, dueDate: '15/01/2024', type: 'mensualidad' },
      { id: 12, name: 'Uso Sala de Cómputo', amount: 16.00, dueDate: '15/01/2024', type: 'otros' },
      { id: 13, name: 'Papelería', amount: 15.00, dueDate: '15/01/2024', type: 'otros' },
      { id: 14, name: 'Mensualidad Agosto', amount: 45.00, dueDate: '15/08/2024', type: 'mensualidad' },
      { id: 15, name: 'Mensualidad Septiembre', amount: 45.00, dueDate: '15/09/2024', type: 'mensualidad' },
      { id: 16, name: 'Mensualidad Octubre', amount: 45.00, dueDate: '15/10/2024', type: 'mensualidad' },
      { id: 17, name: 'Mensualidad Noviembre', amount: 45.00, dueDate: '15/11/2024', type: 'mensualidad' },
      { id: 18, name: 'Mensualidad Diciembre', amount: 45.00, dueDate: '15/12/2024', type: 'mensualidad' }
    ],
    // ... otros ciclos
  };

  const [currentCycle, setCurrentCycle] = useState<Cycle>("I-2024");
  const [showCyclePicker, setShowCyclePicker] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<PaymentItem[]>([]);
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<'all' | 'matricula' | 'mensualidad' | 'otros'>('all');

  // Filtrar pagos según tipo seleccionado
  const filteredPayments = allPaymentOptions[currentCycle].filter(payment => {
    if (paymentTypeFilter === 'all') return true;
    return payment.type === paymentTypeFilter;
  });

  const handlePayment = () => {
    if (selectedPayments.length === 0) {
      alert('Por favor selecciona al menos un concepto de pago');
      return;
    }
    
    const total = selectedPayments.reduce((sum, item) => sum + item.amount, 0);
    const paymentNames = selectedPayments.map(p => p.name).join(', ');
    
    alert(`Iniciando pago de $${total.toFixed(2)} para: ${paymentNames} (${currentCycle})`);
  };

  const togglePaymentSelection = (payment: PaymentItem) => {
    setSelectedPayments(prev => {
      const isSelected = prev.some(p => p.id === payment.id);
      if (isSelected) {
        return prev.filter(p => p.id !== payment.id);
      } else {
        return [...prev, payment];
      }
    });
  };

  const handleCycleSelect = (cycle: Cycle) => {
    setCurrentCycle(cycle);
    setSelectedPayments([]); // Resetear selección al cambiar ciclo
    setShowCyclePicker(false);
  };

  return (
    <View style={tw`bg-white rounded-lg shadow-md mx-2 my-4 p-4`}>
      <Text style={tw`text-lg font-bold text-[#003366] mb-4`}>Realizar Pago</Text>
      
      {/* Selector de Ciclo */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-gray-600 mb-2`}>Ciclo Académico</Text>
        <TouchableOpacity 
          style={tw`flex-row items-center bg-gray-100 rounded-lg px-3 py-2`}
          onPress={() => setShowCyclePicker(true)}
        >
          <Text style={tw`flex-1 text-gray-800`}>{currentCycle}</Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="#4b5563" />
        </TouchableOpacity>
      </View>
      
      {/* Filtros de tipo de pago */}
      <View style={tw`mb-4 flex-row justify-between`}>
        <TouchableOpacity 
          style={tw`px-3 py-1 rounded-full ${paymentTypeFilter === 'all' ? 'bg-[#003366]' : 'bg-gray-200'}`}
          onPress={() => setPaymentTypeFilter('all')}
        >
          <Text style={paymentTypeFilter === 'all' ? tw`text-white` : tw`text-gray-800`}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`px-3 py-1 rounded-full ${paymentTypeFilter === 'matricula' ? 'bg-[#003366]' : 'bg-gray-200'}`}
          onPress={() => setPaymentTypeFilter('matricula')}
        >
          <Text style={paymentTypeFilter === 'matricula' ? tw`text-white` : tw`text-gray-800`}>Matrícula</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`px-3 py-1 rounded-full ${paymentTypeFilter === 'mensualidad' ? 'bg-[#003366]' : 'bg-gray-200'}`}
          onPress={() => setPaymentTypeFilter('mensualidad')}
        >
          <Text style={paymentTypeFilter === 'mensualidad' ? tw`text-white` : tw`text-gray-800`}>Mensualidades</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={tw`px-3 py-1 rounded-full ${paymentTypeFilter === 'otros' ? 'bg-[#003366]' : 'bg-gray-200'}`}
          onPress={() => setPaymentTypeFilter('otros')}
        >
          <Text style={paymentTypeFilter === 'otros' ? tw`text-white` : tw`text-gray-800`}>Otros</Text>
        </TouchableOpacity>
      </View>
      
      {/* Modal para seleccionar ciclo */}
      <Modal
        visible={showCyclePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCyclePicker(false)}
      >
        <View style={tw`flex-1 justify-center bg-black/50 p-4`}>
          <View style={tw`bg-white rounded-lg p-4`}>
            <Text style={tw`text-lg font-bold mb-3`}>Seleccionar Ciclo</Text>
            {availableCycles.map((cycle) => (
              <TouchableOpacity
                key={cycle}
                style={tw`py-3 border-b border-gray-100`}
                onPress={() => handleCycleSelect(cycle)}
              >
                <Text style={tw`text-center ${currentCycle === cycle ? 'text-[#003366] font-bold' : 'text-gray-700'}`}>
                  {cycle}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={tw`mt-3 py-2 bg-gray-100 rounded-lg`}
              onPress={() => setShowCyclePicker(false)}
            >
              <Text style={tw`text-center text-gray-700`}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Lista de pagos disponibles */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-gray-600 mb-2`}>Conceptos de Pago Disponibles</Text>
        <ScrollView style={tw`max-h-64`}>
          {filteredPayments.map((item) => {
            const isSelected = selectedPayments.some(p => p.id === item.id);
            return (
              <TouchableOpacity
                key={item.id}
                style={tw`p-3 border-b border-gray-100 ${isSelected ? 'bg-blue-50' : ''}`}
                onPress={() => togglePaymentSelection(item)}
              >
                <View style={tw`flex-row justify-between items-center`}>
                  <View style={tw`flex-row items-center`}>
                    {isSelected ? (
                      <MaterialIcons name="check-box" size={20} color="#003366" style={tw`mr-2`} />
                    ) : (
                      <MaterialIcons name="check-box-outline-blank" size={20} color="#4b5563" style={tw`mr-2`} />
                    )}
                    <Text style={tw`font-medium`}>{item.name}</Text>
                  </View>
                  <Text style={tw`text-gray-600`}>${item.amount.toFixed(2)}</Text>
                </View>
                <Text style={tw`text-gray-500 text-xs mt-1 ml-7`}>Vence: {item.dueDate}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      
      {/* Resumen de Pago */}
      {selectedPayments.length > 0 && (
        <View style={tw`bg-blue-50 rounded-lg p-3 mb-4`}>
          <Text style={tw`font-bold text-center mb-2`}>Resumen de Pago</Text>
          {selectedPayments.map(payment => (
            <View key={payment.id} style={tw`flex-row justify-between mb-1`}>
              <Text>{payment.name}:</Text>
              <Text>${payment.amount.toFixed(2)}</Text>
            </View>
          ))}
          <View style={tw`border-t border-gray-300 mt-2 pt-2 flex-row justify-between font-bold`}>
            <Text>Total a Pagar:</Text>
            <Text>
              ${selectedPayments.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
            </Text>
          </View>
        </View>
      )}
      
      {/* Botón de PayPal */}
      <TouchableOpacity
        style={tw`bg-[#003366] py-3 rounded-lg flex-row items-center justify-center`}
        onPress={handlePayment}
      >
        <Text style={tw`text-white font-bold mr-2`}>Pagar con</Text>
        <Text style={tw`text-[#FFC439] font-bold`}>PayPal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentSection;