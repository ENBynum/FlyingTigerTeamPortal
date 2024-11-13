import { TextInput } from '@mantine/core'
import { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../app.store.ts'
import { useRSTFormContext } from '../soldier.rst.submit.form.ts'



interface Props {
	width?: CSSProperties['width']
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}


export default function MakeupTrainer({ width, size }: Props): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<TextInput
			id={'rst-makeup-trainer'}
			w={width || '100%'}
			size={size}
			label={'Make Up Trainer/Section'}
			required={rst.makeupRequired}
			disabled={!rst.makeupRequired}
			key={form.key('makeup_trainer')}
			{...form.getInputProps('makeup_trainer')}
			error={form.errors.makeup_trainer}
		/>
	</>
}