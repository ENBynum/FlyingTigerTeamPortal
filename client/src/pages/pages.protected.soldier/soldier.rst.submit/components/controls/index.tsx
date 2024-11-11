import { Button, Grid } from '@mantine/core'
import { CSSProperties, ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../app.store.ts'
import { openCancelConfirmModal } from '../../soldier.rst.submit.slice.ts'



interface Props {
	width: CSSProperties['width']
}


export default function Controls({ width }: Props): ReactNode {
	const dispatch = useDispatch<AppDispatch>()
	
	return <>
		<Grid w={width}>
			<Grid.Col span={1}/>
			<Grid.Col span={5}>
				<Button w={'100%'} variant={'outline'} onClick={() => dispatch(openCancelConfirmModal())}>
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