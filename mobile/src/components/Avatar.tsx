import { Text, View } from 'react-native'

import { Image } from 'expo-image'

import { theme } from '@/src/theme/theme'

type AvatarProps = {
  size: 45 | 34
  urlImage?: string
  acronymName?: string
}
export function Avatar({ size, urlImage, acronymName }: AvatarProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 99999,
        backgroundColor: theme.COLORS.GRAY['05'],

        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {urlImage && (
        <Image
          style={{ width: size, height: size }}
          source={urlImage}
          contentFit="cover"
        />
      )}

      {acronymName && !urlImage && (
        <Text
          numberOfLines={1}
          style={{
            textAlign: 'center',
            fontFamily: theme.FONTS.HELVETICA_REGULAR,
            fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
            color: theme.COLORS.BLACK.NEUTRAL
          }}
        >
          {acronymName}
        </Text>
      )}
    </View>
  )
}
