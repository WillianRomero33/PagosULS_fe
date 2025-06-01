import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Esto oculta el header de TODAS las pantallas en el grupo (auth) */}
    </Stack>
  );
}
