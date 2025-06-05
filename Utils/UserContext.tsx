import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProfileService } from '../Utils/Api';
import { Alert } from 'react-native';

interface UserData {
  firstName: string;
  lastName: string;
  carnet: string;
  career: string;
  email: string;
}

interface UserContextType {
  userData: UserData;
  loading: boolean;
  error: string | null;
  setUserData: (data: UserData) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserData>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType>(null!);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    carnet: '',
    career: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ProfileService.getProfile();
      
      if (response.success && response.data) {
        const profile = response.data;
        setUserData({
          firstName: profile.first_name || profile.name || '',
          lastName: profile.last_name || '',
          carnet: profile.carnet || profile.student_id || '',
          career: profile.career?.name || profile.major || '',
          email: profile.email || ''
        });
      } else {
        throw new Error(response.message || 'Datos de perfil no disponibles');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(error.message || 'Error al cargar el perfil');
      Alert.alert('Error', 'No se pudo cargar la información del perfil');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserData>) => {
    setLoading(true);
    try {
      const updateData = {
        first_name: data.firstName || userData.firstName,
        last_name: data.lastName || userData.lastName,
        carnet: data.carnet || userData.carnet,
        career: data.career || userData.career,
        email: data.email || userData.email
      };

      const response = await ProfileService.updateProfile(updateData);
      
      if (response.success) {
        setUserData(prev => ({
          ...prev,
          ...data
        }));
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        return true;
      } else {
        throw new Error(response.message || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Error al actualizar el perfil');
      Alert.alert('Error', error.message || 'No se pudo actualizar el perfil');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const refreshProfile = async () => {
    await fetchProfile();
  };

  // Cargar datos al iniciar
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <UserContext.Provider value={{ 
      userData, 
      loading,
      error,
      setUserData, 
      fetchProfile, 
      updateProfile,
      refreshProfile
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
}