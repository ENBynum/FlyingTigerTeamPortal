import { AspectRatio, Center, Container, CSSProperties, Image } from '@mantine/core'



/**
 * Renders a header component containing the reserves logo.
 *
 * The component contains a Mantine Container, Center, AspectRatio, and Image
 * component. The Container is fluid and takes up the full width of the screen.
 * The Center component centers the AspectRatio component horizontally and
 * vertically within the Container. The AspectRatio component is set to maintain
 * a 1:1 aspect ratio and its width is set to 'auto' and its height is set to 3/5
 * the value of the 'height' prop passed in. The Image component is set to take
 * up the full width and height of the AspectRatio component, and its source is
 * set to '/reserves-seal.png'.
 *
 * @param {string} props.height - The height of the header component.
 * @returns {JSX.Element} The header component.
 */
export default function Header({ height }: { height: CSSProperties['height'] }): JSX.Element {
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