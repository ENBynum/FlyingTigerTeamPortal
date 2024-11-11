import { Button, Grid, Modal, Stack, Text, Title } from '@mantine/core'
import { ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, AppState } from '../../../../app.store.ts'
import { useRSTFormContext } from '../../soldier.rst.submit.form.ts'
import { closeCancelConfirmModal, reset } from '../../soldier.rst.submit.slice.ts'



export default function CancelConfirm(): ReactNode {
	const form = useRSTFormContext()
	const auth = useSelector((state: AppState) => state.auth)
	const rst = useSelector((state: AppState) => state.soldierRSTSubmit)
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	
	function handleCancel() {
		dispatch(reset())
		form.reset()
		navigate(auth.dashboard_route as string)
	}
	
	return <>
		<Modal
			opened={rst.cancelConfirmModalOpened}
			onClose={() => dispatch(closeCancelConfirmModal())}
			withCloseButton={false}
			centered
		>
			<Stack w={'100%'} justify={'center'} align={'center'} gap={'1.5rem'}>
				<Title order={4}>Confirm Cancellation</Title>
				<Text>Are you sure that you wish to cancel? The current RST request will not be saved.</Text>
				<Grid w={'100%'}>
					<Grid.Col span={6}>
						<Button w={'100%'} variant={'outline'} onClick={() => dispatch(closeCancelConfirmModal())}>
							Finish Request
						</Button>
					</Grid.Col>
					<Grid.Col span={6}>
						<Button w={'100%'} onClick={handleCancel}>
							Cancel Request
						</Button>
					</Grid.Col>
				</Grid>
			</Stack>
		</Modal>
	</>
}