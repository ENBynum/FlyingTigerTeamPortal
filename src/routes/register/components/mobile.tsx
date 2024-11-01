import {
	Anchor,
	AspectRatio,
	Button,
	Center,
	Container,
	Grid,
	Group,
	Image,
	PasswordInput,
	Select,
	Stack,
	Switch,
	Text,
	TextInput
} from '@mantine/core'
import { useMobileOrientation } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '../../../store/main.ts'
import { setPlatoons, setRanks, setSquads } from '../../../store/slices/register.ts'
import { PlatoonType } from '../../../utils/types/profile.ts'
import { CommissionedRanks, EnlistedRanks, Platoons, Squads, WarrantRanks } from '../../../utils/variables/profile.ts'
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

function UserDODID() {
	const form = useRegisterFormContext()
	
	form.watch('dodid', ({ value }) => {
		if (value.toString().length === 10) document.getElementById('register-dodid-confirm')?.focus()
	})
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			document.getElementById('register-dodid-confirm')?.focus()
		}
	}
	
	return <>
		<TextInput
			type={'number'}
			id={'register-dodid'}
			required
			label={'DoD ID'}
			key={form.key('dodid')}
			{...form.getInputProps('dodid')}
			error={form.errors.dodid}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

function UserDODIDConfirm() {
	const form = useRegisterFormContext()
	
	form.watch('dodid_confirm', ({ value }) => {
		if (value?.toString().length === 10) document.getElementById('register-rank')?.focus()
	})
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			document.getElementById('register-rank')?.focus()
		}
	}
	
	return <>
		<TextInput
			type={'number'}
			id={'register-dodid-confirm'}
			required
			label={'Confirm DoD ID'}
			key={form.key('dodid_confirm')}
			{...form.getInputProps('dodid_confirm')}
			error={form.errors.dodid_confirm}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

export function DODIDInputs() {
	return <>
		<Grid w={'100%'}>
			<Grid.Col span={6}><UserDODID/></Grid.Col>
			<Grid.Col span={6}><UserDODIDConfirm/></Grid.Col>
		</Grid>
	</>
}

function UserRank() {
	const form = useRegisterFormContext()
	const register = useSelector((state: RootState) => state.register)
	const dispatch = useDispatch<AppDispatch>()
	
	function handleSearch(value: string) {
		function filterRanks(rank: string): boolean {
			return rank.startsWith(value.toUpperCase().trim())
		}
		
		const filtered_ranks = []
		const filtered_enlisted = EnlistedRanks.filter(filterRanks)
		const filtered_warrant = WarrantRanks.filter(filterRanks)
		const filtered_commissioned = CommissionedRanks.filter(filterRanks)
		
		if (filtered_enlisted.length !== 0) filtered_ranks.push({ group: 'Enlisted', items: filtered_enlisted })
		if (filtered_warrant.length !== 0) filtered_ranks.push({ group: 'Warrant', items: filtered_warrant })
		if (filtered_commissioned.length !== 0) filtered_ranks.push({
			group: 'Commissioned',
			items: filtered_commissioned
		})
		
		dispatch(setRanks(filtered_ranks))
	}
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			if (register.ranks.length === 1 && register.ranks[0].items.length === 1) form.setFieldValue('rank', register.ranks[0].items[0])
			document.getElementById('register-last')?.focus()
		}
	}
	
	return <>
		<Select
			id={'register-rank'}
			w={'100%'}
			label={'Rank'}
			data={register.ranks}
			searchable
			onSearchChange={handleSearch}
			required
			comboboxProps={{ position: 'bottom', transitionProps: { transition: 'pop', duration: 200 } }}
			error={form.errors.rank}
			key={form.key('rank')}
			{...form.getInputProps('rank')}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

function UserLast() {
	const form = useRegisterFormContext()
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			document.getElementById('register-first')?.focus()
		}
	}
	
	return <>
		<TextInput
			type={'text'}
			id={'register-last'}
			required
			w={'100%'}
			label={'Last Name'}
			key={form.key('last')}
			{...form.getInputProps('last')}
			error={form.errors.last}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

function UserFirst() {
	const form = useRegisterFormContext()
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			document.getElementById('register-middle')?.focus()
		}
	}
	
	return <>
		<TextInput
			type={'text'}
			id={'register-first'}
			required
			w={'100%'}
			label={'First Name'}
			key={form.key('first')}
			{...form.getInputProps('first')}
			error={form.errors.first}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

function UserMiddle() {
	const form = useRegisterFormContext()
	
	form.watch('middle', ({ value, previousValue }) => {
		if (value) {
			if (!previousValue) {
				if (value.length > 1) document.getElementById('register-email')?.focus()
			} else {
				if ((value.length - previousValue.length) > 1) document.getElementById('register-email')?.focus()
			}
		}
		
	})
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			document.getElementById('register-email')?.focus()
		}
	}
	
	return <>
		<TextInput
			type={'text'}
			id={'register-middle'}
			required={!form.getValues().no_middle}
			disabled={form.getValues().no_middle}
			w={'100%'}
			label={'Middle Name'}
			key={form.key('middle')}
			{...form.getInputProps('middle')}
			error={form.errors.middle}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

function NoMiddleInput() {
	const form = useRegisterFormContext()
	
	form.watch('no_middle', ({ value }) => {
		if (value) form.setFieldValue('middle', '')
	})
	
	return <>
		<Switch
			defaultChecked={false}
			label={'No Middle Name?'}
			key={form.key('no_middle')}
			{...form.getInputProps('no_middle')}
		/>
	</>
}

export function PII() {
	const { isPortrait, isLandscape } = useMobileOrientation()
	
	return <>
		{isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
			<Grid w={'100%'}>
				<Grid.Col span={4}><UserRank/></Grid.Col>
				<Grid.Col span={8}><UserLast/></Grid.Col>
			</Grid>
			<Grid w={'100%'}>
				<Grid.Col span={6}><UserFirst/></Grid.Col>
				<Grid.Col span={6}><UserMiddle/></Grid.Col>
			</Grid>
			<NoMiddleInput/>
		</Stack>}
		{isLandscape && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
			<Grid w={'100%'}>
				<Grid.Col span={2}><UserRank/></Grid.Col>
				<Grid.Col span={4}><UserLast/></Grid.Col>
				<Grid.Col span={3}><UserFirst/></Grid.Col>
				<Grid.Col span={3}><UserMiddle/></Grid.Col>
			</Grid>
			<NoMiddleInput/>
		</Stack>}
	</>
}

function UserEmail() {
	const form = useRegisterFormContext()
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			document.getElementById('register-phone')?.focus()
		}
	}
	
	return <>
		<TextInput
			type={'email'}
			id={'register-email'}
			w={'100%'}
			label={'Email Address'}
			required
			key={form.key('email')}
			{...form.getInputProps('email')}
			error={form.errors.email}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

function UserPhone() {
	const form = useRegisterFormContext()
	
	form.watch('phone', ({ value }) => {
		if (value.toString().length === 10) document.getElementById('register-platoon')?.focus()
	})
	
	return <TextInput
		type={'tel'}
		id={'register-phone'}
		w={'100%'}
		label={'Phone Number'}
		required
		leftSection={'+1'}
		key={form.key('phone')}
		{...form.getInputProps('phone')}
		error={form.errors.phone}
	/>
	// return <>
	// 	<NumberInput
	// 		type={'tel'}
	// 		id={'register-phone'}
	// 		w={'100%'}
	// 		label={'Phone Number'}
	// 		required
	// 		hideControls
	// 		leftSection={'+1'}
	// 		key={form.key('phone')}
	// 		{...form.getInputProps('phone')}
	// 		error={form.errors.phone}
	// 	/>
	// </>
}

export function Contact() {
	const { isPortrait, isLandscape } = useMobileOrientation()
	
	return <>
		{isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
			<UserEmail/>
			<UserPhone/>
		</Stack>}
		{isLandscape && <Grid w={'100%'}>
			<Grid.Col span={6}><UserEmail/></Grid.Col>
			<Grid.Col span={6}><UserPhone/></Grid.Col>
		</Grid>}
	</>
}

function UserPlatoon() {
	const form = useRegisterFormContext()
	const register = useSelector((state: RootState) => state.register)
	const dispatch = useDispatch<AppDispatch>()
	
	function handleSearch(value: string) {
		dispatch(setPlatoons(Platoons.filter((platoon) => platoon.toUpperCase().includes(value.toUpperCase()))))
	}
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			if (register.platoons.length === 1) form.setFieldValue('platoon', register.platoons[0])
			document.getElementById('register-squad')?.focus()
		}
	}
	
	return <>
		<Select
			id={'register-platoon'}
			w={'100%'}
			label={'Platoon'}
			data={register.platoons}
			searchable
			onSearchChange={handleSearch}
			required
			allowDeselect={false}
			comboboxProps={{ position: 'bottom', transitionProps: { transition: 'pop', duration: 200 } }}
			error={form.errors.platoon}
			key={form.key('platoon')}
			{...form.getInputProps('platoon')}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

function UserSquad() {
	const form = useRegisterFormContext()
	const register = useSelector((state: RootState) => state.register)
	const dispatch = useDispatch<AppDispatch>()
	
	form.watch('platoon', ({ value }) => {
		if (value) dispatch(setSquads(Squads[value as PlatoonType]))
	})
	
	function handleSearch(value: string) {
		dispatch(setSquads(Squads[form.getValues().platoon as PlatoonType].filter((squad) => squad.toUpperCase().includes(value.toUpperCase()))))
	}
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			if (register.squads.length === 1) form.setFieldValue('squad', register.squads[0])
			document.getElementById('register-password')?.focus()
		}
	}
	
	return <>
		<Select
			id={'register-squad'}
			w={'100%'}
			label={'Squad'}
			data={register.squads}
			searchable
			onSearchChange={handleSearch}
			required
			allowDeselect={false}
			comboboxProps={{ position: 'bottom', transitionProps: { transition: 'pop', duration: 200 } }}
			error={form.errors.squad}
			key={form.key('squad')}
			{...form.getInputProps('squad')}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

export function Unit() {
	const { isPortrait, isLandscape } = useMobileOrientation()
	
	return <>
		{isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
			<UserPlatoon/>
			<UserSquad/>
		</Stack>}
		{isLandscape && <Grid w={'100%'}>
			<Grid.Col span={6}>
				<UserPlatoon/>
			</Grid.Col>
			<Grid.Col span={6}>
				<UserSquad/>
			</Grid.Col>
		</Grid>}
	</>
}

function UserPassword() {
	const form = useRegisterFormContext()
	
	// eslint-disable-next-line
	function handleEnter(event: any) {
		if (event.key === 'Enter') {
			event.preventDefault()
			document.getElementById('register-password-confirm')?.focus()
		}
	}
	
	return <>
		<PasswordInput
			type={'password'}
			id={'register-password'}
			w={'100%'}
			label={'Password'}
			required
			key={form.key('password')}
			{...form.getInputProps('password')}
			error={form.errors.password}
			onKeyDownCapture={handleEnter}
		/>
	</>
}

function UserPasswordConfirm() {
	const form = useRegisterFormContext()
	
	return <>
		<PasswordInput
			type={'password'}
			id={'register-password-confirm'}
			w={'100%'}
			label={'Confirm Password'}
			required
			key={form.key('password_confirm')}
			{...form.getInputProps('password_confirm')}
			error={form.errors.password_confirm}
		/>
	</>
}

export function Password() {
	return <>
		<Grid w={'100%'}>
			<Grid.Col span={6}><UserPassword/></Grid.Col>
			<Grid.Col span={6}><UserPasswordConfirm/></Grid.Col>
		</Grid>
	</>
}

export function SubmitButton() {
	const { isPortrait } = useMobileOrientation()
	
	return <>
		<Button type={'submit'} w={isPortrait ? '50%' : '25%'}>
			Create Account
		</Button>
	</>
}

export function SignInLink() {
	const navigate: NavigateFunction = useNavigate()
	
	return <>
		<Group w={'100%'} justify={'center'} gap={'0.5rem'}>
			<Text size={'sm'}>Already have an account?</Text>
			<Anchor size={'sm'} onClick={() => navigate('/sign-in')}>Sign In!</Anchor>
		</Group>
	</>
}