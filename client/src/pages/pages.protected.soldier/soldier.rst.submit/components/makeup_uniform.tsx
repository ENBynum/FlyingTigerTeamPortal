import { Select } from '@mantine/core'
import { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { MAKEUP_UNIFORMS } from '../../../../variables/rst.ts'
import { AppState } from '../../../app.store.ts'
import { useRSTFormContext } from '../soldier.rst.submit.form.ts'



interface Props {
	width?: CSSProperties['width']
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}


export default function MakeupUniform({ width, size }: Props): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<Select
			id={'rst-makeup-uniform'}
			w={width || '100%'}
			size={size}
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