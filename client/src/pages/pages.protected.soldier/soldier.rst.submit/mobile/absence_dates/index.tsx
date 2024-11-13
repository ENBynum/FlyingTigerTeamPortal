import { Group, Stack, Text, Title } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { DateTime } from 'luxon'
import { LegacyRef, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from '../../../../app.store.ts'
import { useRSTFormContext } from '../../soldier.rst.submit.form.ts'
import { setEarliestMakeupDate, setLatestMakeupDate } from '../../soldier.rst.submit.slice.ts'



interface Props {
	reference?: LegacyRef<HTMLDivElement> | undefined
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}


export default function AbsenceDates({ reference, size }: Props): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	const dispatch = useDispatch<AppDispatch>()
	
	form.watch('absence_dates', function ({ value }): void {
		if (value[0] && value[1]) {
			form.setFieldValue(
				'absence_periods',
				Math.floor((((value[1].valueOf() - value[0].valueOf()) / (1000 * 60 * 60 * 24)) * 2) + 2)
			)
			const earliest = Math.floor(value[0].valueOf() - (1000 * 60 * 60 * 24 * 60))
			dispatch(setEarliestMakeupDate(earliest < new Date().valueOf() ? new Date() : new Date(earliest)))
			dispatch(setLatestMakeupDate(new Date(Math.floor(value[1].valueOf() + (1000 * 60 * 60 * 24 * 60)))))
		} else {
			form.setFieldValue('absence_periods', undefined)
		}
	})
	
	function ExcludeDate(date: Date): boolean {
		return !rst.drillDates?.includes(DateTime.fromMillis(date.valueOf()).toFormat('yyyy-LL-dd'))
	}
	
	return <>
		<Stack ref={reference} justify={'center'} align={'center'} gap={'0.5rem'}>
			<Title order={3}>Absence Dates</Title>
			<DatePicker
				id={'rst-absence-dates'}
				size={size || 'md'}
				firstDayOfWeek={0}
				type={'range'}
				allowSingleDateInRange
				minDate={new Date()}
				key={form.key('absence_dates')}
				{...form.getInputProps('absence_dates')}
				c={form.errors.absence_dates ? 'red' : undefined}
				excludeDate={ExcludeDate}
			/>
			{form.errors.absence_dates && <Text w={'100%'} size={'sm'} c={'red'}>{form.errors.absence_dates}</Text>}
			<Group w={'100%'}>
				<Title order={5}>MUTAs:</Title>
				<Text>{form.getValues().absence_periods}</Text>
			</Group>
		</Stack>
	</>
}