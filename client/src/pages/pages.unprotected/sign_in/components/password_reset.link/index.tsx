import { Anchor, Group, Text } from '@mantine/core'



export default function PasswordReset(): JSX.Element {
    return <>
        <Group w={'100%'} justify={'center'} gap={'0.5rem'}>
            <Text size={'sm'}>Forgot your password?</Text>
            <Anchor size={'sm'} onClick={() => console.log('Reset Password')}>Reset</Anchor>
        </Group>
    </>
}