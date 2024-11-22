import { Text, View } from 'react-native'

import { theme } from '@/src/theme/theme'

export function HeaderTableEmployees() {
  return (
    <View
      style={{
        width: '100%',
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.COLORS.BLUE[10],

        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,

        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: theme.COLORS.GRAY[10]
      }}
    >
      <View style={{ flexDirection: 'row', flex: 1, gap: 24 }}>
        <Text
          style={{
            fontFamily: theme.FONTS.HELVETICA_MEDIUM,
            fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
            lineHeight: theme.FONTS.TEXT_STYLE[16].LINEHEIGHT,
            color: theme.COLORS.BLACK.NEUTRAL
          }}
        >
          Foto
        </Text>
        <Text
          style={{
            fontFamily: theme.FONTS.HELVETICA_MEDIUM,
            fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
            lineHeight: theme.FONTS.TEXT_STYLE[16].LINEHEIGHT,
            color: theme.COLORS.BLACK.NEUTRAL
          }}
        >
          Nome
        </Text>
      </View>

      <View style={{ paddingHorizontal: 14 }}>
        <View
          style={{
            width: 8,
            height: 8,
            borderRadius: 99999,
            backgroundColor: theme.COLORS.BLACK.NEUTRAL
          }}
        />
      </View>
    </View>
  )
}
