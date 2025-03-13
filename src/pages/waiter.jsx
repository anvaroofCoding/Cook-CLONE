import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { tables } from '../constants'

const Waiter = () => {
	return (
		<div
			className='w-full h-screen flex flex-col justify-center items-center'
			style={{
				backgroundImage: `url("https://media.baamboozle.com/uploads/images/239644/1611890196_384578")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundAttachment: 'fixed',
			}}
		>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
				{tables.map(table => (
					<div
						key={table.id}
						className='bg-white w-80 shadow-lg rounded-lg p-4'
					>
						<img
							src={table.image}
							alt={table.name}
							className='w-full h-48 object-cover rounded-md'
						/>
						<div className='flex px-2 py-2 items-center justify-between'>
							<p className='text-xl font-semibold'>
								{table.name}
							</p>
							<Link to={`/order/${table.id}`}>
								<Button type='primary'>Buyurtma olish</Button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Waiter
