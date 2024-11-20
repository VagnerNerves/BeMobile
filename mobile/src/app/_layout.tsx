import { useEffect } from 'react'

import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

import { useFonts } from 'expo-font'

import { Loading } from '@/src/components/Loading'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [loaded] = useFonts({
    HelveticaNeue_400Regular: require('@/assets/fonts/HelveticaNeue_400Regular.otf'),
    HelveticaNeue_500Medium: require('@/assets/fonts/HelveticaNeue_500Medium.otf'),
    HelveticaNeue_700Bold: require('@/assets/fonts/HelveticaNeue_700Bold.otf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  return (
    <>
      {loaded ? <Stack screenOptions={{ headerShown: false }} /> : <Loading />}
    </>
  )
}
