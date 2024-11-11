import { Card, Image, Stack, Title } from '@mantine/core'



export default function Header(): JSX.Element {
    return <>
        <Card.Section p={'lg'}>
            <Stack w={'100%'} justify="center" align="center" gap={'0.5rem'}>
                <Image src={'/reserves-seal.png'} w={'4rem'} h={'4rem'} />
                <Title order={3}>Flying Tiger Team Portal - Sign In</Title>
            </Stack>
        </Card.Section>
    </>
}