import { client, urlFor } from '../library/client'
import { PortableText } from '@portabletext/react'

const about = ({ about }) => {
	const { aboutHeading, aboutText, image } = about

	const portableTextComponents = {
		list: {
			bullet: ({ children }) => {return (<ul>{ children }</ul>)},
			number: ({ children }) => {return (<ol>{ children }</ol>)}
		},
		block: {
			normal: ({ children }) => {return (<p>{ children }</p>)},
			h2: ({ children }) => {return (<h2>{ children }</h2>)},
			h3: ({ children }) => {return (<h3>{ children }</h3>)},
			blockquote: ({ children }) => {return (<blockquote className='quote'>{ children }</blockquote>)},
		},
		marks: {
			link: ({ value, children }) => {return (<a href={value?.href} target='_blank'>{ children }</a>)}
		}
	}

	return (
		<div className='about'>

			<h1>{aboutHeading}</h1>
			<PortableText value={aboutText} components={portableTextComponents} />

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