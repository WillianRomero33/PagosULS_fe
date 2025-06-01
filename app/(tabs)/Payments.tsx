import tw from '@/Utils/tw';
import { View } from 'react-native';
import Header from '../../components/layout/Header';
import Payment from '@/components/Payments/Payment';

export default function Dashboard() {
  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header />

        <View style={tw`w-100`}>
          <Payment/>
      </View>

    </View>
  );
}