import clsx from 'clsx'
import { useState } from 'react'
import { Pressable, Text, TextInput, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { api } from '../convex/_generated/api'

import { useSetSessionId } from '@/components/providers/session-provider'
import { useMutation } from '@/lib/usingSession'

export default function LoginForm() {
  const setSessionId = useSetSessionId()
  const insets = useSafeAreaInsets()

  const [flow, setFlow] = useState<'signIn' | 'signUp'>('signIn')
  const signIn = useMutation(api.users.signIn)
  const signUp = useMutation(api.users.signUp)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    try {
      const sessionId = await (flow === 'signIn' ? signIn : signUp)({
        email: email || '',
        password: password || '',
      })
      // Handle error
      if (flow === 'signIn' && sessionId === null) throw new Error('Invalid email or password')
      if (flow === 'signUp' && sessionId === null) throw new Error('That email is already taken')

      // Update session
      setSessionId(sessionId)
    } catch (error: any) {
      if (error.message) {
        alert(error.message)
      }
    }
  }

  return (
    <View className="flex-1 m-4 space-y-4" style={{ paddingTop: insets.top }}>
      <View>
        <View className="flex items-center justify-center m-4">
          <View className="py-4">
            <Text className="font-bold tracking-tighter text-center text-3xl">Welcome to</Text>
            <Text className="font-black tracking-tighter text-center text-4xl uppercase">
              Daywhat
            </Text>
          </View>
          <Text className="text-lg text-center font-semibold">
            You are almost ready to begin planning with your friends!
          </Text>
        </View>
        <Text className="pb-2">Email</Text>
        <TextInput
          className="border-2 border-slate-800 rounded-md p-4"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text className="pb-2">Password</Text>
        <TextInput
          className="border-2 border-slate-800 rounded-md p-4"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Pressable onPress={() => handleSubmit()}>
        {({ pressed }) => (
          <View
            className={clsx('p-4 bg-slate-800 rounded justify-center', pressed && 'bg-slate-500')}>
            <Text className="text-white text-center font-semibold">
              {flow === 'signIn' ? 'Sign me in' : 'Sign me up'}
            </Text>
          </View>
        )}
      </Pressable>
      <Pressable onPress={() => setFlow(flow === 'signIn' ? 'signUp' : 'signIn')}>
        {({ pressed }) => (
          <View
            className={clsx('p-4 bg-slate-800 rounded justify-center', pressed && 'bg-slate-500')}>
            <Text className="text-white text-center font-semibold">
              {flow === 'signIn' ? "I don't have an account" : 'I already have an account'}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}
