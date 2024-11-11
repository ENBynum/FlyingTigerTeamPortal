import { Card, Center } from '@mantine/core'

import SubmitButton from '../../components/submit.button'



export default function Submit(): JSX.Element {
    return <>
        <Card.Section p={'lg'}>
            <Center w={'100%'}>
                <SubmitButton width={'50%'} />
            </Center>
        </Card.Section>
    </>
}