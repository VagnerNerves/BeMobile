import { forwardRef, type ForwardedRef } from 'react'
import {
  TextInput,
  type TextInputProps,
  View,
  TouchableOpacity
} from 'react-native'

import SearchSVG from '@/src/assets/icons/search.svg'

import { theme } from '@/src/theme/theme'

type InputProps = {
  inputProps?: TextInputProps
  onSearch?: () => void
}

export const Input = forwardRef(function Input(
  { inputProps, onSearch }: InputProps,
  ref: ForwardedRef<TextInput>
) {
  return (
    <View
      style={{
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: theme.COLORS.GRAY['05'],
        borderRadius: 100,
        overflow: 'hidden'
      }}
    >
      {onSearch && (
        <TouchableOpacity
          onPress={onSearch}
          style={{
            width: 'auto',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 4
          }}
        >
          <SearchSVG
            width={24}
            height={24}
            color={theme.COLORS.BLACK.NEUTRAL}
          />
        </TouchableOpacity>
      )}

      <TextInput
        ref={ref}
        placeholderTextColor={theme.COLORS.GRAY[20]}
        selectionColor={theme.COLORS.BLACK.NEUTRAL}
        {...inputProps}
        style={[
          {
            flex: 1,
            fontFamily: theme.FONTS.HELVETICA_REGULAR,
            fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
            color: theme.COLORS.BLACK.NEUTRAL,
            backgroundColor: theme.COLORS.GRAY['05'],

            paddingTop: 14,
            paddingBottom: 14,
            paddingRight: 16,
            paddingLeft: onSearch ? 0 : 16
          },
          inputProps?.style
        ]}
      />
    </View>
  )
})
