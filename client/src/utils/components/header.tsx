import { AspectRatio, Center, Container, CSSProperties, Image } from '@mantine/core'



export default function Header({ height }: { height: CSSProperties['height'] }) {
	return <>
		<Container fluid w={'100%'} h={height}>
			<Center
				w={'100%'}
				h={'100%'}
				p={`calc(${height} * (1/5))`}
			>
				<AspectRatio
					ratio={1}
					w={'auto'}
					h={`calc(${height} * (3/5))`}
				>
					<Image
						src={'/reserves-seal.png'}
						w={`calc(${height} * (3/5))`}
						h={`calc(${height} * (3/5))`}
					/>
				</AspectRatio>
			</Center>
		</Container>
	</>
}