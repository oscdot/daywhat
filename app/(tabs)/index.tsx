import { Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function IndexScreen() {
  const insets = useSafeAreaInsets()
  return (
    <View className="flex-1" style={{ paddingTop: insets.top }}>
      <View className="flex items-center m-4">
        <Text className="font-bold text-3xl">Start new plans</Text>
        <Text className="text-base">Start by creating a new group</Text>
      </View>
      <View />
    </View>
  )
}
