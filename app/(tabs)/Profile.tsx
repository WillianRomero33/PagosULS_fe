import Profile from '@/components/CardsProfile/Profile';
import tw from '@/Utils/tw';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import Header from '../../components/layout/Header';
import UserProfile from '@/components/CardsProfile/UserProfile';
import { UserProvider } from '@/Utils/UserContext';

export default function Dashboard() {
    const { width } = useWindowDimensions();
    const isMobile = width < 768;

    return (
        <UserProvider>
            <View style={tw`flex-1 bg-gray-100`}>
                <Header />

                {isMobile ? (
                    <ScrollView contentContainerStyle={tw`pb-4 mt-5`}>
                        <Profile/>
                        <UserProfile/>
                    </ScrollView>
                ) : (
                    <View style={tw`flex-row p-4 gap-4`}>
                        {/* Columna izquierda */}
                        <View style={tw`w-1/3`}>
                            <Profile/>
                            {/* Aquí irán los otros componentes de la columna izquierda */}
                        </View>

                        {/* Columna derecha */}
                        <View style={tw`w-2/3`}>
                            {/* Componentes de la columna derecha */}
                            <UserProfile/>
                        </View>
                    </View>
                )}
            </View>
        </UserProvider>
    );
}