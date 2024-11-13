import { Textarea } from '@mantine/core'
import { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../app.store.ts'
import { useRSTFormContext } from '../soldier.rst.submit.form.ts'



interface Props {
	width?: CSSProperties['width']
	rows?: number
}


export default function MakeupRemarks({ width, rows }: Props): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<Textarea
			id={'rst-makeup-remarks'}
			w={width || '100%'}
			rows={rows || 3}
			label={'Make Up Remarks'}
			disabled={!rst.makeupRequired}
			key={form.key('makeup_remarks')}
			{...form.getInputProps('makeup_remarks')}
		/>
	</>
}