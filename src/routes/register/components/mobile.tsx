import {
	AspectRatio,
	Center,
	Container,
	Grid,
	Image,
	NumberInput,
	Select,
	Stack,
	Switch,
	TextInput
} from '@mantine/core'
import { useState } from 'react'
import { Ranks } from '../../../utils/variables/profile.ts'
import { useRegisterFormContext } from './shared.ts'



export function Header() {
	return <>
		<Container fluid w={'100%'} h={'4rem'}>
			<Center w={'100%'} h={'100%'} p={'0.5rem'}>
				<AspectRatio ratio={1} w={'auto'} h={'3rem'}>
					<Image src={'/reserves-seal.png'} w={'3rem'} h={'3rem'}/>
				</AspectRatio>
			</Center>
		</Container>
	</>
}

function DODIDInputs() {
	const form = useRegisterFormContext()

	return <>
		<Grid w={'100%'}>
			<Grid.Col span={6}>
				<NumberInput
					required
					hideControls
					label={'DoD ID'}
					key={form.key('dodid')}
					{...form.getInputProps('dodid')}
					error={form.errors.dodid}
				/>
			</Grid.Col>
			<Grid.Col span={6}>
				<NumberInput
					required
					hideControls
					label={'Confirm DoD ID'}
					key={form.key('dodid_confirm')}
					{...form.getInputProps('dodid_confirm')}
					error={form.errors.dodid_confirm}
				/>
			</Grid.Col>
		</Grid>
	</>
}

export function PortraitView() {
	const form = useRegisterFormContext()

	const PersonalIdentification = () => {
		const [noMiddle, setNoMiddle] = useState<boolean>(false)

		form.watch('no_middle', ({ value }) => {
			setNoMiddle(value as boolean)
		})

		return <>
			<Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
				<Grid w={'100%'}>
					<Grid.Col span={4}>
						<Select
							required
							w={'100%'}
							label={'Rank'}
							data={Ranks}
							key={form.key('rank')}
							{...form.getInputProps('rank')}
						/>
					</Grid.Col>
					<Grid.Col span={8}>
						<TextInput
							required
							w={'100%'}
							label={'Last Name'}
							key={form.key('last')}
							{...form.getInputProps('last')}
							error={form.errors.last}
						/>
					</Grid.Col>
				</Grid>
				<Grid w={'100%'}>
					<Grid.Col span={6}>
						<TextInput
							required
							w={'100%'}
							label={'First Name'}
							key={form.key('first')}
							{...form.getInputProps('first')}
							error={form.errors.first}
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							required={!noMiddle}
							disabled={noMiddle}
							w={'100%'}
							label={'Middle Name'}
							key={form.key('middle')}
							{...form.getInputProps('middle')}
							error={form.errors.middle}
						/>
					</Grid.Col>
				</Grid>
				<Switch
					defaultChecked={false}
					label={'No Middle Name?'}
					key={form.key('no_middle')}
					{...form.getInputProps('no_middle')}
				/>
			</Stack>
		</>
	}

	return <>
		<DODIDInputs/>
		<PersonalIdentification/>
	</>
}

export function LandscapeView() {
	return <>
		<DODIDInputs/>
		<Grid w={'100%'}>
			<Grid.Col span={5}>
				<DODIDInputs/>
			</Grid.Col>
		</Grid>
	</>
}