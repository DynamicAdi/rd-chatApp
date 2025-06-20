import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CustomStatusBar } from 'components/utils/StatusBar';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';
import '../../global.css';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <CustomStatusBar />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#090015' }}
        edges={['bottom', 'left', 'right']}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: '#090015' },
            headerShown: false,
          }}>
          <Stack.Screen name="main/page" />
          <Stack.Screen name="profile/page" />
          <Stack.Screen name="announcements/page" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
