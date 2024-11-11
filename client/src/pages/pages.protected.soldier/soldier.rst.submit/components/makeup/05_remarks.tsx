import { Textarea } from '@mantine/core'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../app.store.ts'
import { useRSTFormContext } from '../../soldier.rst.submit.form.ts'



export default function Remarks(): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<Textarea
			id={'rst-makeup-remarks'}
			w={'100%'}
			rows={3}
			label={'Make Up Remarks'}
			disabled={!rst.makeupRequired}
			key={form.key('makeup_remarks')}
			{...form.getInputProps('makeup_remarks')}
		/>
	</>
}