import { useEffect } from 'react'

import * as SplashScreen from 'expo-splash-screen'
import * as NavigationBar from 'expo-navigation-bar'

import { Stack } from 'expo-router'
import { ThemeProvider, DefaultTheme } from '@react-navigation/native'

import { useFonts } from 'expo-font'

import { Loading } from '@/src/components/Loading'
import { theme } from '../theme/theme'
import { Platform, StatusBar } from 'react-native'

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [loaded] = useFonts({
    HelveticaNeue_400Regular: require('@/assets/fonts/HelveticaNeue_400Regular.otf'),
    HelveticaNeue_500Medium: require('@/assets/fonts/HelveticaNeue_500Medium.otf'),
    HelveticaNeue_700Bold: require('@/assets/fonts/HelveticaNeue_700Bold.otf')
  })

  const themeProvider = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.COLORS.WHITE.NEUTRAL
    }
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setPositionAsync('absolute')
      NavigationBar.setBackgroundColorAsync('#ffffff00')
    }
  })

  return (
    <ThemeProvider value={themeProvider}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {loaded ? <Stack screenOptions={{ headerShown: false }} /> : <Loading />}
    </ThemeProvider>
  )
}
