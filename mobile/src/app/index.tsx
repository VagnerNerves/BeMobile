import { useEffect, useState } from 'react'
import {
  Text,
  View,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { api } from '@/src/services/api'

import { theme } from '@/src/theme/theme'

import type { EmployeeDTO } from '@/src/dtos/EmployeeDTO'

import { Avatar } from '@/src/components/Avatar'
import { Notification } from '@/src/components/Notification'
import { Input } from '@/src/components/Input'
import { HeaderTableEmployees } from '@/src/components/screens/home/HeaderTableEmployees'
import { CardTableEmployee } from '@/src/components/screens/home/CardTableEmployee'
import { Loading } from '@/src/components/Loading'

const searchSchema = z.object({
  filterEmployee: z.string()
})

type FormDataProps = z.infer<typeof searchSchema>

type requestEmployeesStatusProps = {
  isLoadingGetNew: boolean
  isLoadingGetNext: boolean
  isEmptyDataEndNext: boolean
  isErrorGetEmployees: boolean
  startIndexPage: number
}

export default function Home() {
  const [dataEmployees, setDataEmployees] = useState<EmployeeDTO[] | null>(null)
  const [requestEmployeesStatus, setRequestEmployeesStatus] =
    useState<requestEmployeesStatusProps>({
      isLoadingGetNew: true,
      isLoadingGetNext: false,
      isEmptyDataEndNext: false,
      isErrorGetEmployees: false,
      startIndexPage: 0
    })

  const insets = useSafeAreaInsets()

  const qtdPerPage = 2

  const { control, handleSubmit, getValues } = useForm<FormDataProps>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      filterEmployee: ''
    }
  })

  function filteredNameOrJobOrPhoneEmployees(dataEmployees: EmployeeDTO[]) {
    const filterEmployee = getValues('filterEmployee')
    const searchLowerCase = filterEmployee.toLocaleLowerCase().trim()

    return dataEmployees.filter(
      employee =>
        employee.name.toLowerCase().includes(searchLowerCase) ||
        employee.job.toLowerCase().includes(searchLowerCase) ||
        employee.phone.toLowerCase().includes(searchLowerCase)
    )
  }

  async function getEmployees(type: 'new' | 'next') {
    setRequestEmployeesStatus(prevState => ({
      ...prevState,
      isLoadingGetNew: type === 'new' ? true : false,
      isLoadingGetNext: type === 'next' ? true : false,
      isEmptyDataEndNext: type === 'new' ? false : prevState.isEmptyDataEndNext,
      isErrorGetEmployees:
        type === 'new' ? false : prevState.isErrorGetEmployees
    }))

    try {
      const startIndexPage =
        type === 'new' ? 0 : requestEmployeesStatus.startIndexPage + qtdPerPage

      const filterEmployee = getValues('filterEmployee')
      const isSearch = filterEmployee.trim().length > 0

      const { data } = await api.get(
        isSearch
          ? '/employees'
          : `/employees?_start=${startIndexPage}&_limit=${qtdPerPage}`
      )

      const dataEmployees: EmployeeDTO[] = isSearch
        ? filteredNameOrJobOrPhoneEmployees(data)
        : data

      const isFindEmpty = isSearch ? true : dataEmployees.length <= 0

      setDataEmployees(prevState =>
        type === 'new'
          ? dataEmployees
          : [...(prevState || []), ...dataEmployees]
      )

      setRequestEmployeesStatus({
        isLoadingGetNew: false,
        isLoadingGetNext: false,
        isEmptyDataEndNext: isFindEmpty,
        isErrorGetEmployees: false,
        startIndexPage
      })
    } catch (error) {
      setRequestEmployeesStatus({
        isLoadingGetNew: false,
        isLoadingGetNext: false,
        isEmptyDataEndNext: false,
        isErrorGetEmployees: true,
        startIndexPage: 0
      })
    }
  }

  useEffect(() => {
    getEmployees('new')
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.COLORS.WHITE.NEUTRAL,
          paddingTop: insets.top
        }}
      >
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 12,

            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12
          }}
        >
          <Avatar size={45} acronymName="CG" />

          <Notification numberNotifications={2} />
        </View>

        <View
          style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24, gap: 24 }}
        >
          <View
            style={{ width: '100%', gap: 14 }}
            pointerEvents={
              requestEmployeesStatus.isLoadingGetNew ||
              requestEmployeesStatus.isLoadingGetNext
                ? 'none'
                : 'auto'
            }
          >
            <Text
              style={{
                fontFamily: theme.FONTS.HELVETICA_MEDIUM,
                fontSize: theme.FONTS.TEXT_STYLE[20].SIZE,
                lineHeight: theme.FONTS.TEXT_STYLE[20].LINEHEIGHT,
                color: theme.COLORS.BLACK.NEUTRAL
              }}
            >
              Funcionários
            </Text>

            <Controller
              control={control}
              name="filterEmployee"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  onSearch={handleSubmit(() => {
                    Keyboard.dismiss()
                    getEmployees('new')
                  })}
                  inputProps={{
                    value: value,
                    onChangeText: onChange,
                    onBlur: onBlur,
                    onSubmitEditing: () => getEmployees('new'),
                    returnKeyType: 'search'
                  }}
                />
              )}
            />
          </View>

          <View style={{ flex: 1 }}>
            {requestEmployeesStatus.isLoadingGetNew ? (
              <Loading />
            ) : (
              <FlatList
                data={dataEmployees}
                keyExtractor={item => String(item.id)}
                ListHeaderComponent={
                  dataEmployees && dataEmployees.length > 0 ? (
                    <HeaderTableEmployees />
                  ) : null
                }
                renderItem={({ item, index }) => (
                  <CardTableEmployee
                    employee={item}
                    isLastCard={
                      index === (dataEmployees ? dataEmployees.length - 1 : -1)
                    }
                  />
                )}
                contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
                ListEmptyComponent={() => (
                  <>
                    <Text
                      style={{
                        fontFamily: theme.FONTS.HELVETICA_REGULAR,
                        fontSize: theme.FONTS.TEXT_STYLE[16].SIZE,
                        lineHeight: theme.FONTS.TEXT_STYLE[16].LINEHEIGHT,
                        color: theme.COLORS.GRAY[30],
                        textAlign: 'center'
                      }}
                    >
                      {requestEmployeesStatus.isErrorGetEmployees
                        ? 'Não foi possível buscas os funcionários.'
                        : 'Nenhum resultado encontrado.'}
                    </Text>
                    <Text
                      style={{
                        fontFamily: theme.FONTS.HELVETICA_REGULAR,
                        fontSize: theme.FONTS.TEXT_STYLE[20].SIZE,
                        lineHeight: theme.FONTS.TEXT_STYLE[20].LINEHEIGHT,
                        color: theme.COLORS.GRAY[30],
                        textAlign: 'center'
                      }}
                    >
                      {requestEmployeesStatus.isErrorGetEmployees
                        ? 'Tente mais tarde!'
                        : 'Tente outro nome!'}
                    </Text>
                  </>
                )}
                onRefresh={() => getEmployees('new')}
                refreshing={requestEmployeesStatus.isLoadingGetNew}
                onEndReached={() => {
                  if (
                    !requestEmployeesStatus.isLoadingGetNext &&
                    !requestEmployeesStatus.isEmptyDataEndNext &&
                    !requestEmployeesStatus.isErrorGetEmployees
                  ) {
                    getEmployees('next')
                  }
                }}
                onEndReachedThreshold={0.1}
                ListFooterComponent={() => {
                  if (requestEmployeesStatus.isLoadingGetNext) {
                    return <Loading />
                  }

                  return null
                }}
                keyboardShouldPersistTaps="handled"
              />
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
