import { useMobileOrientation } from 'react-device-detect'

import { AspectRatio, Center, Image, Paper } from '@mantine/core'



export default function Logo(): JSX.Element {
    const { isPortrait } = useMobileOrientation()

    return <>
        <Paper
            withBorder
            radius={'lg'}
            shadow={'xl'}
            w={isPortrait ? '100%' : 'calc((100% - 1rem) / 2)'}
            h={isPortrait ? 'calc((100% - 1rem) / 2)' : '100%'}
            p={'2rem'}
        >
            <Center w={'100%'} h={'100%'}>
                <AspectRatio ratio={1} w={'100%'} h={'auto'}>
                    <Image src={'/reserves-seal.png'} />
                </AspectRatio>
            </Center>
        </Paper>
    </>
}