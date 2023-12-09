import { Link, Tabs } from 'expo-router'
import { CalendarDays, CalendarPlus, UserIcon } from 'lucide-react-native'
import { Pressable, useColorScheme } from 'react-native'
export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#000',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerRight: () => (
            <Link href="/login" asChild>
              <Pressable>
                {({ pressed }) => <UserIcon size={20} strokeWidth={2.5} className="mr-4" />}
              </Pressable>
            </Link>
          ),
          headerShown: false,
          tabBarIcon: ({ color }) => <CalendarPlus color={color} />,
          title: 'Create',
        }}
      />
      <Tabs.Screen
        name="plans"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <CalendarDays name="calendar" color={color} />,
          title: 'My plans',
        }}
      />
    </Tabs>
  )
}
