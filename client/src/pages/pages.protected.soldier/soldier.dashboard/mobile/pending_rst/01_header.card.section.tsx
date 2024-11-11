import { Card, Title } from '@mantine/core'



export default function Header(): JSX.Element {
    return <>
        <Card.Section p={'md'} pb={'0.2rem'}>
            <Title order={2}>Pending RST Requests</Title>
        </Card.Section>
    </>
}