import clsx from 'clsx'
import { Button, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { api } from '@/convex/_generated/api'
import { useMutation, useQuery } from '@/lib/usingSession'

export default function DatesScreen() {
  const user = useQuery(api.users.get, {})
  const insets = useSafeAreaInsets()
  const signOut = useMutation(api.users.signOut)

  if (user === undefined)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )

  if (user === null) {
    return (
      <View>
        <Text>Not logged in</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 mx-4" style={{ paddingTop: insets.top }}>
      <View className="flex items-center m-4">
        <Text className="font-bold text-3xl">Your plans</Text>
        {user?.email && <Text className="dark:text-white">{user.email}</Text>}
      </View>
      <Pressable onPress={() => signOut()}>
        {({ pressed }) => (
          <View className={clsx('p-4 bg-red-500 rounded justify-center', pressed && 'bg-red-500')}>
            <Text className="text-white text-center font-semibold">Sign me out</Text>
          </View>
        )}
      </Pressable>
      <View />
    </View>
  )
}
