import { NavigateFunction, useNavigate } from 'react-router-dom'

import { AspectRatio, Center, Container, Image } from '@mantine/core'



export default function Header(): JSX.Element {
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