import { useDispatch, useSelector } from 'react-redux'

import { Button, Grid, Group, Select, Stack, Text, Textarea, TextInput, Title } from '@mantine/core'
import { DatePicker, DatePickerInput } from '@mantine/dates'

import { AppDispatch, RootState } from '../../../../../store/main'
import {
	setAbsenceType, setEarliestMakeUpDate, setLatestMakeUpDate, setToolTip
} from '../../../../../store/slices/rst'
import {
	AbsenceTypes, AbsenceTypeToolTips, MakeUpUniforms
} from '../../../../../utils/variables/rst'
import { useRSTFormContext } from '../../utils/rst-form'
import { AbsenceTypeType } from '../../utils/types'



export function RSTAbsenceDate({ reference }) {
	const form = useRSTFormContext()
	
	form.watch('absence_dates', ({ value }) => {
		if (value[0] && value[1]) {
			form.setFieldValue(
				'absence_periods',
				Math.floor((((value[1].valueOf() - value[0].valueOf()) / (1000 * 60 * 60 * 24)) * 2) + 2)
			)
		} else {
			form.setFieldValue('absence_periods', undefined)
		}
	})
	
	return <>
		<Stack ref={reference} justify={'center'} align={'center'} gap={'0.5rem'}>
			<Title order={3}>Absence Dates</Title>
			<DatePicker
				id={'rst-absence-dates'}
				firstDayOfWeek={0}
				type={'range'}
				allowSingleDateInRange
				minDate={new Date()}
				key={form.key('absence_dates')}
				{...form.getInputProps('absence_dates')}
				c={form.errors.absence_dates && 'red'}
			/>
			{form.errors.absence_dates && <Text w={'100%'} size={'sm'} c={'red'}>{form.errors.absence_dates}</Text>}
			<Group w={'100%'}>
				<Title order={5}>MUTAs:</Title>
				<Text>{form.getValues().absence_periods}</Text>
			</Group>
		</Stack>
	</>
}

function AbsenceType() {
	const form = useRSTFormContext()
	const rst = useSelector((state: RootState) => state.rst)
	const dispatch = useDispatch<AppDispatch>()
	
	form.watch('absence_type', ({ value }) => {
		AbsenceTypeToolTips.map((tooltip: { type: string, tooltips: string[] }) => {
			if (tooltip.type === value) dispatch(setToolTip(tooltip.tooltips))
		})
		
		dispatch(setAbsenceType(value as AbsenceTypeType))
		
		const earliest = Math.floor(form.getValues().absence_dates[0].valueOf() - (1000 * 60 * 60 * 24 * 60))
		if (earliest < new Date().valueOf()) {
			dispatch(setEarliestMakeUpDate(new Date()))
		} else {
			dispatch(setEarliestMakeUpDate(new Date(earliest)))
		}
		dispatch(setLatestMakeUpDate(new Date(Math.floor(form.getValues().absence_dates[1].valueOf() + (1000 * 60 * 60 * 24 * 60)))))
	})
	
	return <>
		<Stack w={'100%'} justify={'center'} align={'center'} gap={'0.5rem'}>
			<Select
				id={'rst-absence-type'}
				w={'100%'}
				label={'Absence Type'}
				data={AbsenceTypes}
				required
				key={form.key('absence_type')}
				{...form.getInputProps('absence_type')}
			/>
			<Stack w={'100%'} justify={'center'} align={'start'} gap={'0.25rem'}>
				{rst.tooltip?.map((tip: string) => (
					<Text key={tip} size={'xs'} style={{ fontStyle: 'italic' }}> - {tip}</Text>
				))}
			</Stack>
		</Stack>
	</>
}

function AbsenceReason() {
	const form = useRSTFormContext()
	
	return <>
		<Textarea
			id={'#rst-absence-reason'}
			w={'100%'}
			rows={3}
			label={'Absence Reason'}
			required
			key={form.key('absence_reason')}
			{...form.getInputProps('absence_reason')}
			error={form.errors.absence_reason}
		/>
	</>
}

export function RSTAbsence() {
	return <>
		<Stack w={'100%'} justify={'center'} align={'center'} gap={'0.5rem'}>
			<AbsenceType/>
			<AbsenceReason/>
		</Stack>
	</>
}

function MakeUpDate() {
	const form = useRSTFormContext()
	const rst = useSelector((state: RootState) => state.rst)
	
	return <>
		<DatePickerInput
			id={'rst-makeup-dates'}
			w={'100%'}
			label={'Make Up Dates'}
			required={rst.makeup_required}
			disabled={!rst.makeup_required}
			firstDayOfWeek={0}
			type={'range'}
			allowSingleDateInRange
			minDate={rst.earliest_makeup_date}
			maxDate={rst.latest_makeup_date}
			key={form.key('makeup_dates')}
			{...form.getInputProps('makeup_dates')}
			error={form.errors.makeup_dates}
		/>
	</>
}

function MakeUpLocation() {
	const form = useRSTFormContext()
	const rst = useSelector((state: RootState) => state.rst)
	
	return <>
		<TextInput
			id={'rst-makeup-location'}
			w={'100%'}
			label={'Make Up Location'}
			required={rst.makeup_required}
			disabled={!rst.makeup_required}
			key={form.key('makeup_location')}
			{...form.getInputProps('makeup_location')}
			error={form.errors.makeup_location}
		/>
	</>
}

function MakeUpTrainer() {
	const form = useRSTFormContext()
	const rst = useSelector((state: RootState) => state.rst)
	
	return <>
		<TextInput
			id={'rst-makeup-trainer'}
			w={'100%'}
			label={'Make Up Trainer/Section'}
			required={rst.makeup_required}
			disabled={!rst.makeup_required}
			key={form.key('makeup_trainer')}
			{...form.getInputProps('makeup_trainer')}
			error={form.errors.makeup_trainer}
		/>
	</>
}

function MakeUpUniform() {
	const form = useRSTFormContext()
	const rst = useSelector((state: RootState) => state.rst)
	
	return <>
		<Select
			id={'rst-makeup-uniform'}
			w={'100%'}
			label={'Make Up Uniform'}
			data={MakeUpUniforms}
			required={rst.makeup_required}
			disabled={!rst.makeup_required}
			allowDeselect={false}
			key={form.key('makeup_uniform')}
			{...form.getInputProps('makeup_uniform')}
		/>
	</>
}

function MakeUpRemarks() {
	const form = useRSTFormContext()
	const rst = useSelector((state: RootState) => state.rst)
	
	return <>
		<Textarea
			id={'rst-makeup-remarks'}
			w={'100%'}
			rows={3}
			label={'Make Up Remarks'}
			disabled={!rst.makeup_required}
			key={form.key('makeup_remarks')}
			{...form.getInputProps('makeup_remarks')}
		/>
	</>
}

export function RSTMakeUp() {
	return <>
		<Stack w={'100%'} justify={'center'} align={'center'} gap={'0.5rem'}>
			<MakeUpDate/>
			<MakeUpLocation/>
			<MakeUpTrainer/>
			<MakeUpUniform/>
			<MakeUpRemarks/>
		</Stack>
	</>
}

export function FormButtons() {
	return <>
		<Grid w={'100%'}>
			<Grid.Col span={1}/>
			<Grid.Col span={5}>
				<Button w={'100%'} variant={'outline'} onClick={() => console.log('Cancel Request')}>
					Cancel
				</Button>
			</Grid.Col>
			<Grid.Col span={5}>
				<Button w={'100%'} type={'submit'}>
					Submit Request
				</Button>
			</Grid.Col>
			<Grid.Col span={1}/>
		</Grid>
	</>
}