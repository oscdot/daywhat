import FontAwesome from '@expo/vector-icons/FontAwesome'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View, useColorScheme } from 'react-native'

import LoginForm from './login'

import { SessionProvider } from '@/components/providers/session-provider'
import { api } from '@/convex/_generated/api'
import { useQuery } from '@/lib/usingSession'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
    // We need to disable this to be compatible with React Native
    unsavedChangesWarning: false,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <SessionProvider>
      <ConvexProvider client={convex}>
        <RootLayoutNav />
      </ConvexProvider>
    </SessionProvider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  const user = useQuery(api.users.get, {})

  if (user === undefined)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    )

  if (user === null)
    return (
      <View className="flex-1">
        <LoginForm />
      </View>
    )

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  )
}
