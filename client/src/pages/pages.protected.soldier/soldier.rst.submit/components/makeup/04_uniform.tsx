import { Select } from '@mantine/core'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { MAKEUP_UNIFORMS } from '../../../../../variables/rst.ts'
import { AppState } from '../../../../app.store.ts'
import { useRSTFormContext } from '../../soldier.rst.submit.form.ts'



export default function Uniform(): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<Select
			id={'rst-makeup-uniform'}
			w={'100%'}
			label={'Make Up Uniform'}
			data={MAKEUP_UNIFORMS}
			required={rst.makeupRequired}
			disabled={!rst.makeupRequired}
			allowDeselect={false}
			key={form.key('makeup_uniform')}
			{...form.getInputProps('makeup_uniform')}
		/>
	</>
}