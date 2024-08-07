import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-pblack text-3xl">Hello</Text>
      <Link href="/home" className="text-blue-500">Home</Link>
    </View>
  );
}
