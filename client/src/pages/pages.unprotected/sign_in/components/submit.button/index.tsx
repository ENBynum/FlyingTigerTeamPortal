import { CSSProperties } from 'react'

import { Button } from '@mantine/core'



interface Props {
    width: CSSProperties['height']
}

export default function SubmitButton({ width }: Props): JSX.Element {
    return <>
        <Button w={width} size={'lg'} type={'submit'}>
            Sign In
        </Button>
    </>
}