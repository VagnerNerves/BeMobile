import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import ChevronUpSVG from '@/src/assets/icons/charm_chevron-up.svg'
import ChevronDownSVG from '@/src/assets/icons/charm_chevron-down.svg'

import { theme } from '@/src/theme/theme'

import type { EmployeeDTO } from '@/src/dtos/EmployeeDTO'

import { formatDate } from '@/src/utils/formatDate'
import { formatPhone } from '@/src/utils/formatPhone'

import { Avatar } from '@/src/components/Avatar'

type CardTableEmployeeProps = {
  employee: EmployeeDTO
  isLastCard: boolean
}

export function CardTableEmployee({
  employee,
  isLastCard
}: CardTableEmployeeProps) {
  const [viewInfoEmployee, setViewInfoEmployee] = useState(false)

  type LineInfoProps = {
    title: string
    description: string
  }
  function LineInfo({ title, description }: LineInfoProps) {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 16,

          borderBottomWidth: 1,
          borderColor: theme.COLORS.GRAY[10],
          borderStyle: 'dashed'
        }}
      >
        <Text
          style={{
            fontFamily: theme.FONTS.HELVETICA_MEDIUM,
            fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
            lineHeight: theme.FONTS.TEXT_STYLE[16].LINEHEIGHT,
            color: theme.COLORS.BLACK.NEUTRAL
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            flex: 1,
            fontFamily: theme.FONTS.HELVETICA_REGULAR,
            fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
            lineHeight: theme.FONTS.TEXT_STYLE[16].LINEHEIGHT,
            color: theme.COLORS.BLACK.NEUTRAL,
            textAlign: 'right'
          }}
        >
          {description}
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 13.5,
        paddingBottom: viewInfoEmployee ? 31 : 13.5,
        backgroundColor: theme.COLORS.WHITE.NEUTRAL,

        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: isLastCard ? 1 : 0,
        borderColor: theme.COLORS.GRAY[10],

        borderBottomLeftRadius: isLastCard ? 8 : 0,
        borderBottomRightRadius: isLastCard ? 8 : 0
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={() => setViewInfoEmployee(prevState => !prevState)}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 24
          }}
        >
          <Avatar size={34} urlImage={employee.image} />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: theme.FONTS.HELVETICA_MEDIUM,
                fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
                lineHeight: theme.FONTS.TEXT_STYLE[16].LINEHEIGHT,
                color: theme.COLORS.BLACK.NEUTRAL
              }}
            >
              {employee.name}
            </Text>
          </View>
        </View>

        {viewInfoEmployee ? (
          <ChevronUpSVG
            width={32}
            height={32}
            color={theme.COLORS.BLUE.PRIMARY}
          />
        ) : (
          <ChevronDownSVG
            width={32}
            height={32}
            color={theme.COLORS.BLUE.PRIMARY}
          />
        )}
      </TouchableOpacity>

      {viewInfoEmployee && (
        <View style={{ width: '100%', paddingTop: 31, gap: 16 }}>
          <LineInfo title="Cargo" description={employee.job} />
          <LineInfo
            title="Data de admissão"
            description={formatDate({ date: employee.admission_date })}
          />
          <LineInfo
            title="Telefone"
            description={formatPhone({ phone: employee.phone })}
          />
        </View>
      )}
    </View>
  )
}
