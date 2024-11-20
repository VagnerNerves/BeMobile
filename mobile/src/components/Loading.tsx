import { ActivityIndicator, View } from 'react-native'

import { theme } from '@/src/theme/theme'

export function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={theme.COLORS.BLUE.PRIMARY} />
    </View>
  )
}
