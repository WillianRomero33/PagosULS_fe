import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons, Fontisto } from '@expo/vector-icons';
import tw from 'twrnc';
import { useUser } from '../../Utils/UserContext';

const UserProfile = () => {
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 375;
  const { userData, setUserData } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({...userData});

  const handleSave = () => {
    setUserData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({...userData});
    setIsEditing(false);
  };

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      {/* Tarjeta de perfil compacta */}
      <View style={tw`bg-white rounded-lg shadow-sm mx-3 my-2 overflow-hidden`}>
        {/* Encabezado */}
        <View style={tw`flex-row justify-between items-center bg-[#003366] px-3 py-2`}>
          <Text style={tw`text-white font-bold ${isSmallScreen ? 'text-base' : 'text-lg'}`}>
            Perfil Estudiantil
          </Text>
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <MaterialIcons name="edit" size={18} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Contenido */}
        <View style={tw`p-3`}>
          {/* Avatar y nombre */}
          <View style={tw`flex-row items-center mb-3`}>
            <MaterialCommunityIcons 
              name="account-circle" 
              size={isSmallScreen ? 50 : 60} 
              color="#003366" 
              style={tw`mr-3`}
            />
            <View>
              <Text style={tw`font-bold ${isSmallScreen ? 'text-base' : 'text-lg'}`}>
                {userData.firstName}
              </Text>
              <Text style={tw`font-bold ${isSmallScreen ? 'text-base' : 'text-lg'}`}>
                {userData.lastName}
              </Text>
            </View>
          </View>
          
          {/* Información en lista compacta */}
          <View style={tw`border-t border-gray-100 pt-2`}>
            {/* Carnet */}
            <View style={tw`flex-row items-center py-2`}>
              <FontAwesome5 name="id-card" size={14} color="#003366" style={tw`mr-2`} />
              <Text style={tw`text-gray-800 ${isSmallScreen ? 'text-sm' : 'text-base'}`}>
                <Text style={tw`text-gray-500`}>Carnet: </Text>
                {userData.carnet}
              </Text>
            </View>
            
            {/* Carrera */}
            <View style={tw`flex-row items-center py-2`}>
              <FontAwesome5 name="graduation-cap" size={14} color="#003366" style={tw`mr-2`} />
              <Text style={tw`text-gray-800 ${isSmallScreen ? 'text-sm' : 'text-base'}`}>
                <Text style={tw`text-gray-500`}>Carrera: </Text>
                {userData.career}
              </Text>
            </View>

            {/* Correo */}
            <View style={tw`flex-row items-center py-2`}>
              <Fontisto name="email" size={14} color="#003366" style={tw`mr-2`} />
              <Text 
                style={tw`text-gray-800 ${isSmallScreen ? 'text-sm' : 'text-base'}`}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                <Text style={tw`text-gray-500`}>Email: </Text>
                {userData.email}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Modal de Edición Compacto */}
      <Modal
        visible={isEditing}
        transparent={true}
        animationType="fade"
      >
        <View style={tw`flex-1 justify-center bg-black/50 p-4`}>
          <View style={tw`bg-white rounded-lg p-4 max-h-[80%]`}>
            <View style={tw`flex-row justify-between items-center mb-3`}>
              <Text style={tw`text-lg font-bold text-[#003366]`}>Editar Perfil</Text>
              <TouchableOpacity onPress={handleCancel}>
                <MaterialIcons name="close" size={22} color="#003366" />
              </TouchableOpacity>
            </View>
            
            <ScrollView>
              {/* Campos editables compactos */}
              <View style={tw`mb-2`}>
                <Text style={tw`text-gray-600 text-sm mb-1`}>Nombre</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded p-2 text-sm`}
                  value={tempData.firstName}
                  onChangeText={(text) => setTempData({...tempData, firstName: text})}
                />
              </View>
              
              <View style={tw`mb-2`}>
                <Text style={tw`text-gray-600 text-sm mb-1`}>Apellido</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded p-2 text-sm`}
                  value={tempData.lastName}
                  onChangeText={(text) => setTempData({...tempData, lastName: text})}
                />
              </View>

                <View style={tw`mb-2`}>
                <Text style={tw`text-gray-600 text-sm mb-1`}>Carnet</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded p-2 text-sm`}
                  value={tempData.carnet}
                  onChangeText={(text) => setTempData({...tempData, carnet: text})}
                />
              </View>
              
              <View style={tw`mb-2`}>
                <Text style={tw`text-gray-600 text-sm mb-1`}>Carrera</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded p-2 text-sm`}
                  value={tempData.career}
                  onChangeText={(text) => setTempData({...tempData, career: text})}
                />
              </View>

              <View style={tw`mb-2`}>
                <Text style={tw`text-gray-600 text-sm mb-1`}>Correo</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded p-2 text-sm`}
                  value={tempData.email}
                  onChangeText={(text) => setTempData({...tempData, email: text})}
                />
              </View>

            </ScrollView>
            
            {/* Botones de acción compactos */}
            <View style={tw`flex-row justify-between mt-3`}>
              <TouchableOpacity 
                style={tw`bg-gray-200 px-4 py-1.5 rounded`}
                onPress={handleCancel}
              >
                <Text style={tw`text-gray-800 text-sm`}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={tw`bg-[#003366] px-4 py-1.5 rounded`}
                onPress={handleSave}
              >
                <Text style={tw`text-white text-sm`}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserProfile;