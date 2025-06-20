import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';
import { CustomStatusBar } from 'components/utils/StatusBar';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

export default function Layout() {
  const [FontLoaded] = useFonts({
    
    // DM SANS
    DmLight: require("../public/fonts/dm_sans/DMSans_Light.ttf"),
    DmRegular: require("../public/fonts/dm_sans/DMSans_Regular.ttf"),
    DmMedium: require("../public/fonts/dm_sans/DMSans_Medium.ttf"),
    DmSemiBold: require("../public/fonts/dm_sans/DMSans_SemiBold.ttf"),
    DmBold: require("../public/fonts/dm_sans/DMSans_Bold.ttf"),

    // POPPINS
    PopLight: require("../public/fonts/poppins/Poppins_Light.ttf"),
    PopRegular: require("../public/fonts/poppins/Poppins_Regular.ttf"),
    PopMedium: require("../public/fonts/poppins/Poppins_Medium.ttf"),
    PopSemiBold: require("../public/fonts/poppins/Poppins_SemiBold.ttf"),
    PopBold: require("../public/fonts/poppins/Poppins_Bold.ttf"),

    // GROTESK
    GroteskLight: require("../public/fonts/grotesk/grotesk_Light.ttf"),
    GroteskRegular: require("../public/fonts/grotesk/grotesk_Regular.ttf"),
    GroteskMedium: require("../public/fonts/grotesk/grotesk_Medium.ttf"),
    GroteskSemiBold: require("../public/fonts/grotesk/grotesk_SemiBold.ttf"),
    GroteskBold: require("../public/fonts/grotesk/grotesk_Bold.ttf"),

  })

  if (!FontLoaded) {
    return <Text>Loading...</Text>
  }
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
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
