// App.tsx
import { useState } from 'react';
import { View } from 'react-native';
import Login from '../../components/auth/login';
import Header from '../../components/layout/Header';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={{ flex: 1 }}>

      <Header />

      
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
      
    </View>
  );
}
