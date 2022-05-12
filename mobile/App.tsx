import "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import Widget from "./src/components/Widget";
import { theme } from "./src/theme";

export default function App() {
  // usando fontes
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  // enquanto as fontes não forem carregadas, retorna um loading ao invés do conteúdo
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Widget />
    </View>
  );
}
