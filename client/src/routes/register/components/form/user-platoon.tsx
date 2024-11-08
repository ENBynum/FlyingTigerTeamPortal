import { useDispatch, useSelector } from 'react-redux'

import { Select } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../../../store/main'
import { PlatoonUnit } from '../../../../utils/types/units'
import { FetchPlatoons } from '../../utils/api'
import { useRegisterFormContext } from '../../utils/register-form'
import { setPlatoons, setPlatoonSelectorData } from '../../utils/register-slice'
import { FetchPlatoonListReturnData } from '../../utils/types'



export default function UserPlatoon(): JSX.Element {
    const form = useRegisterFormContext()
    const register = useSelector((state: RootState) => state.register)
    const dispatch = useDispatch<AppDispatch>()

    form.watch('company', function ({ value }): void {
        form.setFieldValue('platoon', '')
        form.setFieldValue('squad', '')
        FetchPlatoons(value).then(function (res: FetchPlatoonListReturnData): void {
            if (res.error) {
                notifications.show({
                    position: 'top-center',
                    withCloseButton: false,
                    autoClose: 3000,
                    message: res.error,
                    color: 'red'
                })
            } else {
                dispatch(setPlatoons(res.data as PlatoonUnit[]))
            }
        })
    })

    function handleSearch(value: string): void {
        dispatch(setPlatoonSelectorData(register.platoons.filter(function (platoon: PlatoonUnit): boolean {
            return platoon.name.includes(value)
        })))
    }

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (register.platoon_selector_data.length === 1) {
                form.setFieldValue('platoon', register.platoon_selector_data[0].value)
            }
            document.getElementById('register-squad')?.focus()
        }
    }

    return <>
        <Select
            id={'register-platoon'}
            w={'100%'}
            label={'Platoon'}
            data={register.platoon_selector_data}
            searchable
            onSearchChange={handleSearch}
            required
            allowDeselect={false}
            comboboxProps={{ position: 'bottom', transitionProps: { transition: 'pop', duration: 200 } }}
            error={form.errors.platoon}
            key={form.key('platoon')}
            {...form.getInputProps('platoon')}
            onKeyDownCapture={handleEnter}
        />
    </>
}