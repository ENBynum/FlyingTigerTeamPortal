import { useDispatch, useSelector } from 'react-redux'

import { Select } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../../../store/main'
import { SquadUnit } from '../../../../utils/types/units'
import { FetchSquads } from '../../utils/api'
import { useRegisterFormContext } from '../../utils/register-form'
import { setSquads, setSquadSelectorData } from '../../utils/register-slice'
import { FetchSquadListReturnData } from '../../utils/types'



export default function UserSquad(): JSX.Element {
    const form = useRegisterFormContext()
    const register = useSelector((state: RootState) => state.register)
    const dispatch = useDispatch<AppDispatch>()

    form.watch('platoon', function ({ value }): void {
        form.setFieldValue('squad', '')
        FetchSquads(value).then(function (res: FetchSquadListReturnData): void {
            if (res.error) {
                notifications.show({
                    position: 'top-center',
                    withCloseButton: false,
                    autoClose: 3000,
                    message: res.error,
                    color: 'red'
                })
            } else {
                dispatch(setSquads(res.data as SquadUnit[]))
            }
        })
    })

    function handleSearch(value: string): void {
        dispatch(setSquadSelectorData(register.squads.filter(function (squad: SquadUnit): boolean {
            return squad.name.includes(value)
        })))
    }

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (register.squad_selector_data.length === 1) form.setFieldValue('squad', register.squad_selector_data[0].value)
            document.getElementById('register-password')?.focus()
        }
    }

    return <>
        <Select
            id={'register-squad'}
            w={'100%'}
            label={'Squad'}
            data={register.squad_selector_data}
            searchable
            onSearchChange={handleSearch}
            required
            allowDeselect={false}
            comboboxProps={{ position: 'bottom', transitionProps: { transition: 'pop', duration: 200 } }}
            error={form.errors.squad}
            key={form.key('squad')}
            {...form.getInputProps('squad')}
            onKeyDownCapture={handleEnter}
        />
    </>
}