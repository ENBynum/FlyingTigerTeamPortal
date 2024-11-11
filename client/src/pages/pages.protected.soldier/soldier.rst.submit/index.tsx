import { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useDispatch } from 'react-redux'

import { useDocumentTitle } from '@mantine/hooks'

import { AppDispatch } from '../../app.store'
import SoldierLayout from '../soldier.layout'
import SoldierRSTSubmitMobile from './mobile'
import { FetchTraining } from './services/get.training'
import { RSTFormProvider, useRSTForm } from './soldier.rst.submit.form'
import { setDrillDates } from './soldier.rst.submit.slice'



export default function SoldierRSTSubmitRoute(): JSX.Element {
    useDocumentTitle('New RST Request - Flying Tigers Team Portal')

    const dispatch = useDispatch<AppDispatch>()

    useEffect(function (): void {
        FetchTraining().then(function (res): void {
            if ('error' in res) {

            } else {
                dispatch(setDrillDates(res.training))
            }
        })
    }, [])

    const form = useRSTForm({
        mode: 'uncontrolled',
        initialValues: {
            absence_dates: [null, null],
            absence_periods: undefined,
            absence_type: '',
            absence_reason: '',
            makeup_dates: [null, null],
            makeup_location: '',
            makeup_trainer: '',
            makeup_uniform: '',
            makeup_remarks: ''
        },
        validateInputOnBlur: true,
        validate: {
            absence_dates: value => value[0] && !value[1] && 'Select Absence End Dates',
            absence_reason: value => value && value.length < 15 && 'Reason Too Short',
            makeup_dates: value => value[0] && !value[1] && 'Select Make-Up End Dates'
        }
    })

    return <SoldierLayout>
        <form onSubmit={() => console.log('')} style={{ width: '100%', height: '100%' }}>
            <RSTFormProvider form={form}>
                {isMobileOnly ? <SoldierRSTSubmitMobile /> : <div />}
            </RSTFormProvider>
        </form>
    </SoldierLayout>
}