import { client, urlFor } from '../library/client'

const about = ({ about }) => {
	const { aboutHeading, aboutText, image } = about
	console.log('image', image)
	return (
		<div className='about'>
			<h1>{aboutHeading}</h1>
			{aboutText && aboutText.map((content, i) => (
				<p key={i}>{content.children[0].text}</p>
			))}
			{image && (
				<img key={image.asset._ref} src={urlFor(image).url()} alt={image.attribution} className='about__image' />
			)}
		</div>
	)
}

export const getServerSideProps = async () => {
	const about = await client.fetch(`*[_type == "about"][0]`)

	return {
		props: {
			about
		}
	}
}

export default about