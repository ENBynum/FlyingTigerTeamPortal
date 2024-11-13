import { DatePickerInput } from '@mantine/dates'
import { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../app.store.ts'
import { useRSTFormContext } from '../soldier.rst.submit.form.ts'



interface Props {
	width?: CSSProperties['width']
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}


export default function MakeupDates({ width, size }: Props): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<DatePickerInput
			id={'rst-makeup-dates'}
			w={width || '100%'}
			size={size}
			label={'Make Up Dates'}
			required={rst.makeupRequired}
			disabled={!rst.makeupRequired}
			firstDayOfWeek={0}
			type={'range'}
			allowSingleDateInRange
			minDate={rst.earliestMakeupDate}
			maxDate={rst.latestMakeupDate}
			key={form.key('makeup_dates')}
			{...form.getInputProps('makeup_dates')}
			error={form.errors.makeup_dates}
		/>
	</>
}