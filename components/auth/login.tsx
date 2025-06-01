// components/Login.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const Login = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    
    // Validación simple
    if (!credentials.username || !credentials.password) {
      Alert.alert('Error', 'Por favor ingresa tu usuario y contraseña');
      setIsLoading(false);
      return;
    }

    // Simulación de autenticación (reemplazar con tu lógica real)
    setTimeout(() => {
      if (credentials.username === 'RA01137239' && credentials.password === 'ULS2024') {
        onLoginSuccess();
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <View style={[tw`flex-1 justify-center p-6 bg-white`, styles.container]}>
      {/* Logo ULS */}
      <View style={tw`items-center mb-10`}>
        <Image
          source={require('../../assets/images/ULS.png')}
          style={tw`w-48 h-16`}
          resizeMode="contain"
        />
        <Text style={tw`text-gray-600 mt-2`}>Sistema de Pagos Estudiantiles</Text>
      </View>

      {/* Formulario */}
      <View style={tw`mb-6`}>
        {/* Campo de usuario */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-gray-700 mb-1`}>Carnet o Correo</Text>
          <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3`}>
            <Ionicons name="person-outline" size={20} color="#4b5563" style={tw`mr-2`} />
            <TextInput
              style={tw`flex-1 py-3 text-gray-800`}
              placeholder="RA01137239"
              value={credentials.username}
              onChangeText={(text) => setCredentials({...credentials, username: text})}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* Campo de contraseña */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-700 mb-1`}>Contraseña</Text>
          <View style={tw`flex-row items-center border border-gray-300 rounded-lg px-3`}>
            <Ionicons name="lock-closed-outline" size={20} color="#4b5563" style={tw`mr-2`} />
            <TextInput
              style={tw`flex-1 py-3 text-gray-800`}
              placeholder="••••••••"
              value={credentials.password}
              onChangeText={(text) => setCredentials({...credentials, password: text})}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={20} 
                color="#4b5563" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón de login */}
        <TouchableOpacity
          style={tw`bg-[#003366] p-4 rounded-lg items-center`}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Text style={tw`text-white font-bold`}>Cargando...</Text>
          ) : (
            <Text style={tw`text-white font-bold`}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  }
});

export default Login;