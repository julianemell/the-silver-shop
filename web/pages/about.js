import { client } from '../library/client'

const about = ({ about }) => {
	const { aboutHeading, aboutText } = about
	return (
		<div>
			<h1>{aboutHeading}</h1>
			<p>{aboutText}</p>
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