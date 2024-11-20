import { Text, View } from 'react-native'
import { theme } from '@/src/theme/theme'

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text
        style={{
          fontFamily: theme.FONTS.HELVETICA_REGULAR,
          fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
          lineHeight: theme.FONTS.TEXT_STYLE[16].LINEHEIGHT,
          color: theme.COLORS.BLACK.NEUTRAL
        }}
      >
        Initial Project BeMobile
      </Text>
    </View>
  )
}
