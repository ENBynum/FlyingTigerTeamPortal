import { useMobileOrientation } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { NavigateFunction, useNavigate } from 'react-router-dom'

import {
	Anchor, AspectRatio, Button, Center, Container, Grid, Group, Image, PasswordInput, Select,
	Stack, Switch, Text, TextInput
} from '@mantine/core'

import { AppDispatch, RootState } from '../../../../store/main.ts'
import { setPlatoons, setRanks, setSquads } from '../../../../store/slices/register.ts'
import { PlatoonType } from '../../../../utils/types/profile.ts'
import {
	CommissionedRanks, EnlistedRanks, Platoons, Squads, WarrantRanks
} from '../../../../utils/variables/profile.ts'
import { useRegisterFormContext } from '../../utils/register-form.ts'



/**
 * The top-most header component of the registration page, containing the
 * reserves logo. Clicking anywhere in the header will redirect the user to the
 * root route.
 * @returns The header component.
 */
export function Header(): JSX.Element {
	const navigate: NavigateFunction = useNavigate()

	return <>
		<Container fluid w={'100%'} h={'4rem'} onClick={(): void => navigate('/')}>
			<Center w={'100%'} h={'100%'} p={'0.5rem'}>
				<AspectRatio ratio={1} w={'auto'} h={'3rem'}>
					<Image src={'/reserves-seal.png'} w={'3rem'} h={'3rem'} />
				</AspectRatio>
			</Center>
		</Container>
	</>
}

/**
 * Renders a text input field for the user's DoD ID. The input
 * field is required and has a label of "DoD ID". The input
 * field is watched by the form context, and when the input
 * field has a length of 10, the focus is shifted to the
 * DoD ID confirmation input field.
 *
 * @returns The rendered DoD ID input field.
 */
function UserDODID(): JSX.Element {
	const form = useRegisterFormContext()

	form.watch('dodid', ({ value }): void => {
		if (value.toString().length === 10) document.getElementById('register-dodid-confirm')?.focus()
	})

	/**
	 * Handles the 'Enter' key press event for the DoD ID input field.
	 * Prevents the default form submission and shifts focus to the
	 * DoD ID confirmation input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders a text input field for the user to confirm their DoD ID. The input
 * field is required and has a label of "Confirm DoD ID". The input field is
 * watched by the form context, and when the input field has a length of 10, the
 * focus is shifted to the rank input field.
 *
 * @returns The rendered DoD ID confirmation input field.
 */
function UserDODIDConfirm() {
	const form = useRegisterFormContext()

	form.watch('dodid_confirm', ({ value }): void => {
		if (value?.toString().length === 10) document.getElementById('register-rank')?.focus()
	})

	/**
	 * Handles the 'Enter' key press event for the DoD ID confirmation input field.
	 * Prevents the default form submission and shifts focus to the rank input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders a grid containing two input fields for the user to enter their
 * Department of Defense ID and confirm it. Each input field occupies
 * half of the grid's width.
 *
 * @returns A JSX element containing the DoD ID input fields.
 */
export function DODIDInputs(): JSX.Element {
	return <>
		<Grid w={'100%'}>
			<Grid.Col span={6}><UserDODID /></Grid.Col>
			<Grid.Col span={6}><UserDODIDConfirm /></Grid.Col>
		</Grid>
	</>
}

/**
 * Renders a select input field for the user to select their rank. The
 * input field is required and has a label of "Rank". The input field is
 * watched by the form context, and when the input field has only one item,
 * that item is automatically selected and the focus is shifted to the
 * last name input field.
 *
 * @returns The rendered rank input field.
 */
function UserRank(): JSX.Element {
	const form = useRegisterFormContext()
	const register = useSelector((state: RootState) => state.register)
	const dispatch = useDispatch<AppDispatch>()

	/**
	 * Filters the ranks available in the rank selection dropdown by
	 * searching for ranks that start with the given value (case-insensitive).
	 * The ranks are filtered from the following groups: Enlisted, Warrant, and
	 * Commissioned. The filtered ranks are then dispatched to the register
	 * state to update the available ranks.
	 *
	 * @param value - The value to search for in the rank names.
	 */
	function handleSearch(value: string) {
		/**
		 * Filters a rank by checking if it starts with the given value (case-insensitive).
		 * @param rank - The rank to check.
		 * @returns True if the rank starts with the given value, false otherwise.
		 */
		function filterRanks(rank: string): boolean {
			return rank.startsWith(value.toUpperCase().trim())
		}

		const filtered_ranks: { group: string, items: string[] }[] = []
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

	/**
	 * Handles the 'Enter' key press event for the rank selection dropdown.
	 * Prevents the default form submission and shifts focus to the last name
	 * input field. If the rank selection dropdown has only one item, that item
	 * is automatically selected and the focus is shifted to the last name
	 * input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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


/**
 * Renders a text input field for the user's last name. The input
 * field is required and has a label of "Last Name". The input field
 * is watched by the form context to handle validation and state
 * updates. When the 'Enter' key is pressed, focus is shifted to the
 * first name input field.
 *
 * @returns The rendered last name input field.
 */
function UserLast(): JSX.Element {
	const form = useRegisterFormContext()

	/**
	 * Handles the 'Enter' key press event for the last name input field.
	 * Prevents the default form submission and shifts focus to the first name
	 * input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders a text input field for the user's first name. The input
 * field is required and has a label of "First Name". The input field
 * is watched by the form context to handle validation and state
 * updates. When the 'Enter' key is pressed, focus is shifted to the
 * middle name input field.
 *
 * @returns The rendered first name input field.
 */
function UserFirst(): JSX.Element {
	const form = useRegisterFormContext()

	/**
	 * Handles the 'Enter' key press event for the first name input field.
	 * Prevents the default form submission and shifts focus to the middle
	 * name input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders a text input field for the user's middle name. The input
 * field is required and has a label of "Middle Name". The input field
 * is watched by the form context to handle validation and state
 * updates. When the 'Enter' key is pressed, focus is shifted to the
 * email input field.
 *
 * @returns The rendered middle name input field.
 */
function UserMiddle(): JSX.Element {
	const form = useRegisterFormContext()

	form.watch('middle', ({ value, previousValue }): void => {
		if (value) {
			if (!previousValue) {
				if (value.length > 1) document.getElementById('register-email')?.focus()
			} else {
				if ((value.length - previousValue.length) > 1) document.getElementById('register-email')?.focus()
			}
		}

	})

	/**
	 * Handles the 'Enter' key press event for the middle name input field.
	 * Prevents the default form submission and shifts focus to the email
	 * input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders a toggle switch input field for the user to indicate if they do
 * not have a middle name. The input field is watched by the form context
 * to handle validation and state updates. When the toggle switch is turned
 * on, the middle name input field is cleared and disabled.
 *
 * @returns The rendered toggle switch input field.
 */
function NoMiddleInput(): JSX.Element {
	const form = useRegisterFormContext()

	form.watch('no_middle', ({ value }): void => {
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

/**
 * Renders the personal identifying information input fields for the
 * user registration form, including rank, last name, first name, middle
 * name, and a toggle switch to indicate if the user does not have a
 * middle name. The input fields are rendered in a responsive grid
 * layout that changes based on the orientation of the device.
 *
 * @returns The rendered personal identifying information input fields.
 */
export function PII(): JSX.Element {
	const { isPortrait, isLandscape } = useMobileOrientation()

	return <>
		{isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
			<Grid w={'100%'}>
				<Grid.Col span={4}><UserRank /></Grid.Col>
				<Grid.Col span={8}><UserLast /></Grid.Col>
			</Grid>
			<Grid w={'100%'}>
				<Grid.Col span={6}><UserFirst /></Grid.Col>
				<Grid.Col span={6}><UserMiddle /></Grid.Col>
			</Grid>
			<NoMiddleInput />
		</Stack>}
		{isLandscape && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
			<Grid w={'100%'}>
				<Grid.Col span={2}><UserRank /></Grid.Col>
				<Grid.Col span={4}><UserLast /></Grid.Col>
				<Grid.Col span={3}><UserFirst /></Grid.Col>
				<Grid.Col span={3}><UserMiddle /></Grid.Col>
			</Grid>
			<NoMiddleInput />
		</Stack>}
	</>
}

/**
 * Renders an email input field for the user registration form. The input
 * field is required and has a label of "Email Address". The input field is
 * watched by the form context to handle validation and state updates. When
 * the 'Enter' key is pressed, focus is shifted to the phone input field.
 *
 * @returns The rendered email input field.
 */
function UserEmail(): JSX.Element {
	const form = useRegisterFormContext()

	/**
	 * Handles the 'Enter' key press event for the email input field.
	 * Prevents the default form submission and shifts focus to the
	 * phone input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders a phone number input field for the user registration form. The
 * input field is required and has a label of "Phone Number". The input field
 * is watched by the form context to handle validation and state updates. When
 * the user has entered a 10-digit phone number, focus is shifted to the
 * platoon input field.
 *
 * @returns The rendered phone input field.
 */
function UserPhone(): JSX.Element {
	const form = useRegisterFormContext()

	form.watch('phone', ({ value }): void => {
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
}

/**
 * Renders the contact information input fields for the user registration
 * form, including email address and phone number. The input fields are
 * rendered in a responsive grid layout that changes based on the
 * orientation of the device.
 *
 * @returns The rendered contact information input fields.
 */
export function Contact(): JSX.Element {
	const { isPortrait, isLandscape } = useMobileOrientation()

	return <>
		{isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
			<UserEmail />
			<UserPhone />
		</Stack>}
		{isLandscape && <Grid w={'100%'}>
			<Grid.Col span={6}><UserEmail /></Grid.Col>
			<Grid.Col span={6}><UserPhone /></Grid.Col>
		</Grid>}
	</>
}

/**
 * Renders a select input field for the user to select their platoon. The
 * input field is required and has a label of "Platoon". The input field is
 * watched by the form context, and when the input field has only one item when
 * 'Enter' is pressed, that item is automatically selected and the focus is 
 * shifted to the squad selection dropdown.
 *
 * @returns The rendered platoon input field.
 */
function UserPlatoon(): JSX.Element {
	const form = useRegisterFormContext()
	const register = useSelector((state: RootState) => state.register)
	const dispatch = useDispatch<AppDispatch>()

	/**
	 * Filters the available platoons by searching for platoon names that
	 * include the given value (case-insensitive). The filtered platoons
	 * are then dispatched to update the register state with the available
	 * platoons.
	 *
	 * @param value - The value to search for in the platoon names.
	 */
	function handleSearch(value: string): void {
		dispatch(setPlatoons(Platoons.filter((platoon) => platoon.toUpperCase().includes(value.toUpperCase()))))
	}

	/**
	 * Handles the 'Enter' key press event for the platoon selection dropdown.
	 * Prevents the default form submission and shifts focus to the squad
	 * selection dropdown. If the platoon selection dropdown has only one item,
	 * that item is automatically selected and the focus is shifted to the
	 * squad selection dropdown.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders a select input field for the user to select their squad. The
 * input field is required and has a label of "Squad". The input field is
 * watched by the form context to handle validation and state updates. When
 * the user selects a platoon, the available squads are updated. When the
 * user searches for a squad, the available squads are filtered by searching
 * for squad names that include the given value (case-insensitive). When the
 * input field only has one item and the 'Enter' key is pressed, that item is
 * automatically selected and the focus is shifted to the password input field.
 *
 * @returns The rendered squad input field.
 */
function UserSquad(): JSX.Element {
	const form = useRegisterFormContext()
	const register = useSelector((state: RootState) => state.register)
	const dispatch = useDispatch<AppDispatch>()

	form.watch('platoon', ({ value }): void => {
		if (value) dispatch(setSquads(Squads[value as PlatoonType]))
	})

	/**
	 * Filters the available squads by searching for squad names that
	 * include the given value (case-insensitive). The filtered squads
	 * are then dispatched to update the register state with the available
	 * squads.
	 *
	 * @param value - The value to search for in the squad names.
	 */
	function handleSearch(value: string): void {
		dispatch(setSquads(Squads[form.getValues().platoon as PlatoonType].filter((squad) => squad.toUpperCase().includes(value.toUpperCase()))))
	}

	/**
	 * Handles the 'Enter' key press event for the squad selection dropdown.
	 * Prevents the default form submission and shifts focus to the password
	 * input field. If the squad selection dropdown has only one item, that item
	 * is automatically selected and the focus is shifted to the password
	 * input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders the unit selection components for the user registration form
 * based on the device orientation. In portrait mode, the components are
 * stacked vertically, while in landscape mode, they are arranged in a
 * grid with two columns. The rendered components include the platoon and
 * squad selection dropdowns.
 *
 * @returns The rendered unit selection components.
 */
export function Unit(): JSX.Element {
	const { isPortrait, isLandscape } = useMobileOrientation()

	return <>
		{isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
			<UserPlatoon />
			<UserSquad />
		</Stack>}
		{isLandscape && <Grid w={'100%'}>
			<Grid.Col span={6}>
				<UserPlatoon />
			</Grid.Col>
			<Grid.Col span={6}>
				<UserSquad />
			</Grid.Col>
		</Grid>}
	</>
}

/**
 * Renders a password input field for the user registration form. The input
 * field is required and has a label of "Password". The input field is watched
 * by the form context to handle validation and state updates. When the 'Enter'
 * key is pressed, focus is shifted to the password confirmation input field.
 *
 * @returns The rendered password input field.
 */
function UserPassword(): JSX.Element {
	const form = useRegisterFormContext()

	/**
	 * Handles the 'Enter' key press event for the password input field.
	 * Prevents the default form submission and shifts focus to the
	 * password confirmation input field.
	 *
	 * @param event - The keyboard event triggered by pressing a key.
	 */
	function handleEnter(event: { key: string; preventDefault: () => void }): void {
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

/**
 * Renders a password input field for the user registration form. The input
 * field is required and has a label of "Confirm Password". The input field is
 * watched by the form context to handle validation and state updates.
 *
 * @returns The rendered password confirmation input field.
 */
function UserPasswordConfirm(): JSX.Element {
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

/**
 * Renders the password input fields for the user registration form. The
 * input fields are rendered in a responsive grid layout that changes based
 * on the orientation of the device.
 *
 * @returns The rendered password input fields.
 */
export function Password(): JSX.Element {
	return <>
		<Grid w={'100%'}>
			<Grid.Col span={6}><UserPassword /></Grid.Col>
			<Grid.Col span={6}><UserPasswordConfirm /></Grid.Col>
		</Grid>
	</>
}

/**
 * Renders a submit button for the user registration form. The button is
 * rendered in a responsive layout that changes based on the orientation
 * of the device. On portrait mode, the button spans 50% of the width, and
 * on landscape mode, it spans 25% of the width.
 *
 * @returns The rendered submit button.
 */
export function SubmitButton(): JSX.Element {
	const { isPortrait } = useMobileOrientation()

	return <>
		<Button type={'submit'} w={isPortrait ? '50%' : '25%'}>
			Create Account
		</Button>
	</>
}

/**
 * Renders a sign-in link component for the user registration form. The
 * component consists of a centered group containing a text element
 * asking if the user has an account and an anchor element to navigate
 * to the sign-in page.
 *
 * @returns The rendered sign-in link component.
 */
export function SignInLink(): JSX.Element {
	const navigate: NavigateFunction = useNavigate()

	return <>
		<Group w={'100%'} justify={'center'} gap={'0.5rem'}>
			<Text size={'sm'}>Already have an account?</Text>
			<Anchor size={'sm'} onClick={() => navigate('/sign-in')}>Sign In!</Anchor>
		</Group>
	</>
}