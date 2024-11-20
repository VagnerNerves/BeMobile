import { Text, View } from 'react-native'

import BellNotificationSVG from '@/src/assets/icons/bell-notification.svg'

import { theme } from '@/src/theme/theme'

type NotificationProps = {
  numberNotifications?: number
}
export function Notification({ numberNotifications }: NotificationProps) {
  const formattedNumber = numberNotifications?.toString().padStart(2, '0')

  return (
    <View
      style={{
        width: 36,
        height: 37,

        justifyContent: 'flex-end',
        alignItems: 'flex-start',

        overflow: 'hidden'
      }}
    >
      {numberNotifications && numberNotifications > 0 && (
        <View
          style={{
            width: 20,
            height: 20,
            position: 'absolute',
            top: 0,
            right: 0,

            backgroundColor: theme.COLORS.BLUE.PRIMARY,
            borderRadius: 99999,
            zIndex: 10,

            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: theme.FONTS.HELVETICA_BOLD,
              fontSize: theme.FONTS.TEXT_STYLE[10].SIZE,
              color: theme.COLORS.WHITE.NEUTRAL
            }}
          >
            {formattedNumber}
          </Text>
        </View>
      )}

      <BellNotificationSVG
        width={32}
        height={32}
        color={theme.COLORS.BLACK.NEUTRAL}
      />
    </View>
  )
}
