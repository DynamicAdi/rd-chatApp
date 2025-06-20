// app/index.tsx
import { useRouter, useNavigationContainerRef } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { user, isLoading } = useAuth() as any;
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!isLoading && ready) {
      if (user) {
        router.replace("/(tabs)/main/page");
      } else {
        router.replace("/(auth)/welcome");
      }
    }
  }, [isLoading, user, ready]);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color={"white"} />
    </View>
  );
}
