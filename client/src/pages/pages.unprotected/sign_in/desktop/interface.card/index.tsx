import { Card } from '@mantine/core'

import Header from './01_header.card.section'
import Inputs from './02_inputs.card.section'
import Submit from './03_submit.card.section'
import Redirect from './04_register_redirect.card.section'



export default function SignIn(): JSX.Element {
    return <>
        <Card w={'30rem'} withBorder shadow='xl' radius={'lg'}>
            <Header />
            <Inputs />
            <Submit />
            <Redirect />
        </Card>
    </>
}