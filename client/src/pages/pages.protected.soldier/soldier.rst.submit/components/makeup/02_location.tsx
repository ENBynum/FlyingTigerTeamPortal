import { TextInput } from '@mantine/core'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../app.store.ts'
import { useRSTFormContext } from '../../soldier.rst.submit.form.ts'



export default function Location(): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<TextInput
			id={'rst-makeup-location'}
			w={'100%'}
			label={'Make Up Location'}
			required={rst.makeupRequired}
			disabled={!rst.makeupRequired}
			key={form.key('makeup_location')}
			{...form.getInputProps('makeup_location')}
			error={form.errors.makeup_location}
		/>
	</>
}