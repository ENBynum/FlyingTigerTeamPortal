import { useMobileOrientation } from 'react-device-detect'

import { Button } from '@mantine/core'



export default function SubmitButton(): JSX.Element {
    const { isPortrait } = useMobileOrientation()

    return <>
        <Button type={'submit'} w={isPortrait ? '50%' : '25%'}>
            Create Account
        </Button>
    </>
}