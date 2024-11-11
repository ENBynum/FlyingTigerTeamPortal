import { TextInput } from '@mantine/core'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../app.store.ts'
import { useRSTFormContext } from '../../soldier.rst.submit.form.ts'



export default function Trainer(): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<TextInput
			id={'rst-makeup-trainer'}
			w={'100%'}
			label={'Make Up Trainer/Section'}
			required={rst.makeupRequired}
			disabled={!rst.makeupRequired}
			key={form.key('makeup_trainer')}
			{...form.getInputProps('makeup_trainer')}
			error={form.errors.makeup_trainer}
		/>
	</>
}