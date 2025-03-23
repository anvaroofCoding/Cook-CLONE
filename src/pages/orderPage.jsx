import { Button, Modal, message } from 'antd'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { allFoods } from '../constants'

const OrderPage = () => {
	const { id } = useParams() // Stol raqamini olish
	const [category, setCategory] = useState('Taomlar')
	const [orders, setOrders] = useState({})
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [orderedItems, setOrderedItems] = useState([])

	// Kategoriya bo‘yicha filter qilish
	const filteredFoods = allFoods.filter(food => food.category === category)

	// Buyurtmani ko'paytirish
	const increaseCount = foodId => {
		setOrders(prev => ({
			...prev,
			[foodId]: (prev[foodId] || 0) + 1,
		}))
	}

	// Buyurtmani kamaytirish
	const decreaseCount = foodId => {
		setOrders(prev => ({
			...prev,
			[foodId]: Math.max((prev[foodId] || 0) - 1, 0),
		}))
	}

	// Buyurtmani oshpazga yuborish
	const sendOrder = () => {
		const selectedItems = Object.entries(orders)
			.filter(([_, count]) => count > 0)
			.map(([foodId, count]) => {
				const food = allFoods.find(f => f.id === Number(foodId))
				return {
					name: food.name,
					count,
				}
			})

		if (selectedItems.length === 0) {
			message.warning('Iltimos, kamida bitta taom tanlang!')
			return
		}

		// LocalStorage'dagi mavjud buyurtmalarni olish
		const existingOrders = JSON.parse(localStorage.getItem('orderedItems')) || {}

		// Agar stol allaqachon mavjud bo'lsa, yangilash, aks holda yangi yaratish
		existingOrders[id] = [...(existingOrders[id] || []), ...selectedItems]

		// LocalStorage'ga saqlash
		localStorage.setItem('orderedItems', JSON.stringify(existingOrders))

		message.success('Buyurtma oshpazga yuborildi!')

		// Modal oynani ko‘rsatish
		setOrderedItems(selectedItems)
		setIsModalVisible(true)

		// Buyurtma maydonini tozalash
		setOrders({})
	}

	// Buyurtmalar mavjudligini tekshirish
	const hasOrder = Object.values(orders).some(count => count > 0)

	return (
		<div className='w-full mt-15 flex flex-col items-center p-6'>
			<h1 className='text-3xl font-bold mb-4'>Buyurtmalar - {id}-stol</h1>

			{/* Kategoriyalar */}
			<div className='flex space-x-4 mb-6'>
				{['Taomlar', 'Ichimliklar', 'Salatlar'].map(cat => (
					<Button
						key={cat}
						type={category === cat ? 'primary' : 'default'}
						onClick={() => setCategory(cat)}
					>
						{cat}
					</Button>
				))}
			</div>

			{/* Taomlar ro‘yxati */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
				{filteredFoods.map(food => (
					<div key={food.id} className='bg-white p-4 shadow-lg rounded-lg text-center'>
						<img src={food.image} alt={food.name} className='w-full h-40 object-cover rounded-md' />
						<h2 className='text-xl font-semibold mt-2'>{food.name}</h2>

						{/* Buyurtma tugmalari */}
						<div className='flex items-center justify-center mt-2 space-x-4'>
							<Button onClick={() => decreaseCount(food.id)}>-</Button>
							<span className='text-lg font-bold'>{orders[food.id] || 0}</span>
							<Button onClick={() => increaseCount(food.id)}>+</Button>
						</div>
					</div>
				))}
			</div>

			{/* Buyurtmani yuborish tugmasi */}
			{hasOrder && (
				<Button type='primary' size='large' className='mt-6' onClick={sendOrder}>
					Buyurtmani oshpazga yuborish
				</Button>
			)}

			{/* Buyurtma tasdiqlash modal oynasi */}
			<Modal
				title='Buyurtma Tasdiqlandi'
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={[
					<Button key='ok' type='primary' onClick={() => setIsModalVisible(false)}>
						OK
					</Button>,
				]}
			>
				<p className='text-lg font-semibold'>
					Buyurtma oshpazga yuborildi! Endi tayyorlanmoqda... 🍽️👨‍🍳
				</p>
				<ul className='mt-4'>
					{orderedItems.map(item => (
						<li key={item.name} className='text-lg'>
							✅ {item.name} - {item.count} ta
						</li>
					))}
				</ul>
			</Modal>
		</div>
	)
}

export default OrderPage
