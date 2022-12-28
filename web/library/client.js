import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// connection to sanity
export const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	apiVersion: '2022-12-20',
	useCdn: true,
	token: process.env.SANITY_TOKEN,
})

// so that we can use sanity images
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)
