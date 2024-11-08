import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Select } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../../../store/main'
import { CompanyUnit } from '../../../../utils/types/units'
import { FetchCompanies } from '../../utils/api'
import { useRegisterFormContext } from '../../utils/register-form'
import { setCompanies, setCompanySelectorData } from '../../utils/register-slice'
import { FetchCompanyListReturnData } from '../../utils/types'



export default function UserCompany(): JSX.Element {
    const form = useRegisterFormContext()
    const register = useSelector((state: RootState) => state.register)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(function (): void {
        FetchCompanies().then(function (res: FetchCompanyListReturnData): void {
            if (res.error) {
                notifications.show({
                    position: 'top-center',
                    withCloseButton: false,
                    autoClose: 3000,
                    message: res.error,
                    color: 'red'
                })
            } else {
                dispatch(setCompanies(res.data as CompanyUnit[]))
            }
        })
    }, [])

    function handleSearch(value: string): void {
        dispatch(setCompanySelectorData(register.companies.filter(function (company: CompanyUnit): boolean {
            return company.name.includes(value)
        })))
    }

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (register.company_selector_data.length === 1) form.setFieldValue('company', register.company_selector_data[0].value)
            document.getElementById('register-platoon')?.focus()
        }
    }

    return <>
        <Select
            id={'register-company'}
            w={'100%'}
            label={'Company'}
            data={register.company_selector_data}
            searchable
            onSearchChange={handleSearch}
            required
            allowDeselect={false}
            comboboxProps={{ position: 'bottom', transitionProps: { transition: 'pop', duration: 200 } }}
            error={form.errors.company}
            key={form.key('company')}
            {...form.getInputProps('company')}
            onKeyDownCapture={handleEnter}
        />
    </>
}