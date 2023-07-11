import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { getRestaurant, getRestaurantMenu, getCategoriesWithItems } from '../../database'

import ModalItem from '../../components/modalItem'
import ModalCart from '../../components/ModalCart'
import MenuBar from '../../components/MenuBar'

export default function Home({ restaurant, categories }) {
	const [modalItem, setModalItem] = useState(null)
	const [modalCart, setModalCart] = useState(null)
	const [cart, setCart] = useState([])

	const getOpened = () => {
		return true;
	}

	const handleCancel = () => {
		setModalItem(null)
	}

	const handleAddToCart = (item) => {
		setCart([...cart, item])
		setModalItem(null)
		console.log(cart)
	}

	useEffect(() => {
		const cart = localStorage.getItem('cart')
		if (cart) {
			setCart(JSON.parse(cart))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
		console.log(cart)
	}, [cart])

	return (
		<>
			<div className="bg-gray-100 min-h-screen flex flex-col pt-0 items-center pb-4 position-relative">
				<div className="relative h-80 mb-6 w-full overflow-hidden">
					<Image src={restaurant.image} layout="fill" objectFit="cover" alt='restaurant image' className="h-full w-full object-cover border-gray-300 rounded-lg bg-center " />
				</div>
				<h1 className="text-4xl font-bold mb-4">{restaurant.name}</h1>
				<p className="text-gray-500 mb-8">{restaurant.description}</p>
				<div className="max-w-2xl w-full">
					{
						getOpened(restaurant) ? (
							<div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 mx-4 md:mx-0">
								Open
							</div>
						) : (
							<div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">
								Closed
							</div>
						)
					}
					<div className="flex flex-row overflow-x-auto mb-4 mx-4 md:mx-0 py-4">
					{
						categories.map(category => (
							<a key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden mr-4"
								href={`#${category.name}`}>
								<div className="p-4 flex">
									<div>
										<h3 className="text-lg font-medium">{category.name}</h3>
										<p className="text-gray-500">{category.description}</p>
									</div>
								</div>
							</a>

						))
					}
					</div>

				<div className="flex items-center justify-between mb-4 mx-4 md:mx-0">
					<h2 className="text-2xl font-bold">Menu</h2>
					<div className="flex items-center">
						<p className="text-gray-500 mr-2">Sort by</p>
						<select className="border border-gray-300 rounded-lg px-4 py-2">
							<option>Price</option>
							<option>Rating</option>
						</select>
					</div>
				</div>
				{categories.map(category => (
					<div key={category.id} className="bg-white rounded-lg shadow-lg overflow-hidden mt-4 mx-4 md:mx-0" id={category.name}>
						<div className="p-4 flex pb-0">
							<div>
								<h3 className="text-lg font-medium">{category.name}</h3>
							</div>
						</div>
						<div className="px-4 pb-4">
							{category.items.map(item => (
								<div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">
									<div className="p-4 flex">
										<div className="relative h-24 w-24 mr-4">
											<div className="flex items-center h-full">
												<Image src={item.image} layout="fill" objectFit="cover" className="h-full w-full object-cover border-gray-300 rounded-lg" />
											</div>
										</div>
										<div>
											<h3 className="text-lg font-medium mb-2">{item.name}</h3>
											<p className="text-gray-500">${item.price}</p>
											<p className="text-gray-500 mt-2">{item.description}</p>
											<button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
												onClick={() => setModalItem(item)}>
												Add to cart
											</button>

										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
			<div className="bg-transparent w-full h-16"></div>
			<ModalItem item={modalItem} handleCancel={handleCancel} handleAddToCart={handleAddToCart} />
			{modalCart &&
				<ModalCart
					cart={cart}
					setCart={setCart}
					handleCancel={() => setModalCart(null)}
					setModalOpen={setModalCart}
				/>
			}
		</div >
			<MenuBar cart={cart} openCart={() => cart.length > 0 ? setModalCart(true) : alert('Cart is empty')} />
		</>
	)
}

export async function getServerSideProps(context) {
	const restaurant = await getRestaurant(context.params.restaurantid)
	const menuItems = await getRestaurantMenu(context.params.restaurantid)
	const categories = await getCategoriesWithItems(context.params.restaurantid)

	if (!restaurant || !menuItems || !categories) {
		return {
			notFound: true
		}
	}

	return {
		props: {
			restaurant,
			menuItems,
			categories
		}
	}
};
