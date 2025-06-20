import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
          contentStyle: { backgroundColor: '#090015' },
        headerShown: false,
      }}
    >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="clientLogin/page" />
        <Stack.Screen name="EmployeeLogin/page" />
        <Stack.Screen name="NewUser/page" />


    </Stack>
  );
}
