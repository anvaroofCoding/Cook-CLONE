import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'

const Cook = () => {
	const [orders, setOrders] = useState({})

	useEffect(() => {
		// Faqat ofitsant yuborgan yangi buyurtmalarni olish
		const savedOrders = localStorage.getItem('orderedItems')
		if (savedOrders) {
			const parsedOrders = JSON.parse(savedOrders)
			setOrders(parsedOrders || {})
		}
	}, [])

	const completeOrder = (tableId, index) => {
		const updatedOrders = { ...orders }
		updatedOrders[tableId].splice(index, 1)

		// Agar stolning barcha buyurtmalari tayyor bo‘lsa, o‘chiramiz
		if (updatedOrders[tableId].length === 0) {
			delete updatedOrders[tableId]
		}

		setOrders(updatedOrders)
		localStorage.setItem('orderedItems', JSON.stringify(updatedOrders))
		message.success(`Stol ${tableId} buyurtmasi tayyor! ✅`)
	}

	return (
		<div
			className='w-full h-screen flex flex-col items-center p-6'
			style={{
				backgroundImage: `url("https://media.baamboozle.com/uploads/images/239644/1611890196_384578")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundAttachment: 'fixed',
			}}
		>
			<h1 className='text-3xl font-bold mb-6 text-white'>
				Oshpaz Sahifasi
			</h1>

			{Object.keys(orders).length === 0 ? (
				<p className='text-xl text-white'>
					Hozircha yangi buyurtmalar yo'q.
				</p>
			) : (
				<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl'>
					<h2 className='text-2xl font-semibold mb-4'>
						Yangi Buyurtmalar
					</h2>
					{Object.entries(orders).map(([tableId, items]) => (
						<div key={tableId} className='mb-6'>
							<h3 className='text-xl font-bold mb-2'>
								Stol: {tableId}
							</h3>
							<ul>
								{/* Xatolikni oldini olish uchun: items || [] */}
								{(items || []).map((order, index) => (
									<li
										key={index}
										className='flex justify-between items-center border-b py-2'
									>
										<span className='text-lg'>
											{order.name} - {order.count} ta
										</span>
										<Button
											type='primary'
											onClick={() =>
												completeOrder(tableId, index)
											}
										>
											Tayyor ✅
										</Button>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Cook
