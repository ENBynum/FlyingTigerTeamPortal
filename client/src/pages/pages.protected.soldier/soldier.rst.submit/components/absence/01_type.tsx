import { Select, Stack, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AbsenceTypes } from '../../../../../types/rst.ts'
import { ABSENCE_TYPES } from '../../../../../variables/rst.ts'
import { AppDispatch, AppState } from '../../../../app.store.ts'
import { useRSTFormContext } from '../../soldier.rst.submit.form.ts'
import { setAbsenceType } from '../../soldier.rst.submit.slice.ts'



export default function Type(): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	const dispatch = useDispatch<AppDispatch>()
	
	form.watch('absence_type', function ({ value }): void {
		dispatch(setAbsenceType(value as AbsenceTypes))
		
	})
	
	return <>
		<Stack w={'100%'} justify={'center'} align={'center'} gap={'0.5rem'}>
			<Select
				id={'rst-absence-type'}
				w={'100%'}
				label={'Absence Type'}
				data={ABSENCE_TYPES}
				required
				key={form.key('absence_type')}
				{...form.getInputProps('absence_type')}
			/>
			<Stack w={'100%'} justify={'center'} align={'start'} gap={'0.25rem'}>
				{rst.absenceTypeTooltips?.map(function (tip: string): JSX.Element {
					return <Text key={tip} size={'xs'} style={{ fontStyle: 'italic' }}> - {tip}</Text>
				})}
			</Stack>
		</Stack>
	</>
}