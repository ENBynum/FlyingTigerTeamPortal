import { AspectRatio, Center, Container, Image, Paper, Stack } from '@mantine/core'
import { ReactNode } from 'react'



interface Props {
	children: ReactNode
}


export default function HomeSignInWrapper({ children }: Props) {
	return <Container fluid w={'100vw'} h={'100vh'}>
		<Stack
			w={'100%'}
			h={'100%'}
			justify={'start'}
			align={'center'}
			gap={'1rem'}
			p={'1rem'}
		>
			<Paper
				withBorder
				radius={'lg'}
				shadow={'xl'}
				w={'100%'}
				h={'calc((100% - 1rem) / 2)'}
				p={'2rem'}
			>
				<Center w={'100%'} h={'100%'}>
					<AspectRatio
						ratio={1}
						w={'100%'}
						h={'auto'}
					>
						<Image src={'/reserves-seal.png'}/>
					</AspectRatio>
				</Center>
			</Paper>
			<Stack
				w={'100%'}
				h={'calc((100% - 1rem) / 2)'}
				justify={'center'}
				align={'center'}
				gap={'2rem'}
				p={'1rem'}
			>
				{children}
			</Stack>
		</Stack>
	</Container>
}