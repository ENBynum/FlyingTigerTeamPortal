import { TextInput } from '@mantine/core'
import { CSSProperties, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../app.store.ts'
import { useRSTFormContext } from '../soldier.rst.submit.form.ts'



interface Props {
	width?: CSSProperties['width']
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}


export default function MakeupLocation({ width, size }: Props): ReactNode {
	const form = useRSTFormContext()
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	
	return <>
		<TextInput
			id={'rst-makeup-location'}
			size={size}
			w={width || '100%'}
			label={'Make Up Location'}
			required={rst.makeupRequired}
			disabled={!rst.makeupRequired}
			key={form.key('makeup_location')}
			{...form.getInputProps('makeup_location')}
			error={form.errors.makeup_location}
		/>
	</>
}