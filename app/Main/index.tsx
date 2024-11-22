import { View, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PositiveButton from "@/components/primaryButton";
import PositiveText from "@/components/primaryText";
import Divider from "@/components/divider";
import { MotiView } from "moti";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootStackParams";
import { useCustomFonts } from "@/hooks/useCustomFonts";
import PrimaryText from "@/components/primaryText";
import { Image } from "expo-image";
import BackgroundGradient from "@/components/backgroundGradient";

type NavigationProp = NativeStackScreenProps<RootStackParamList>;

export default function Index() {
  const navigation = useNavigation<NavigationProp>();

  const [isFontLoaded] = useCustomFonts();

  if (!isFontLoaded) {
    <View>
      <PositiveText>Loading...</PositiveText>
      <ActivityIndicator size="large" color="#FD841F" />
    </View>;
  }

  return (
    <View className="flex justify-around items-center h-full p-12 ">
      <BackgroundGradient style={styles.background} />
      <MotiView
        from={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 400 }}
      >
        <MotiView
          from={{ scale: 0.85 }}
          animate={{ scale: 1.1 }}
          transition={{
            type: "timing",
            duration: 3000,
            loop: true,
            delay: 100,
          }}
        >
          <Image
            source={require("@/assets/images/buzzedTitleText.png")}
            className="w-64 h-32 object-contain"
            style={{ resizeMode: "contain" }}
          />
        </MotiView>
      </MotiView>

      <View className="flex flex-col justify-around h-48 w-full">
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", duration: 400 }}
          className="flex gap-y-4"
        >
          <View>
            <PositiveButton
              text="Join Game"
              handlePress={() =>
                navigation.navigate("enterName", { type: "joinGame" })
              }
            />
          </View>
          <View>
            <Divider text="OR" />
          </View>
          <View>
            <PositiveButton
              text="Create Game"
              handlePress={() =>
                navigation.navigate("enterName", { type: "createGame" })
              }
            />
          </View>
        </MotiView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
