import { client } from '../../library/client'

export default async function mutateProducts(req, res) {
	req.body.map(product => {
		try {
			client
				.patch(product.id)
				.dec({ stockLevel: product.quantity })
				.commit()
				.then((updatedProduct) =>
					console.log('Yay, updated Entry! ID:', updatedProduct._id)
				)
		} catch (err) {
			console.error('Det gick inte att uppdatera: ', err.message)
			return res.status(500).json({ message: `Couldn't update stocklevel`, err })
		} finally {
			return res.status(200).json({ message: `Stocklevel updated!` })
		}
	})
}

