import { Button } from 'antd'
import React from 'react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Navbar = ({ onLogout }) => {
	return (
		<nav className='fixed w-full top-0 backdrop-blur-sm bg-white/40 border border-b-black/60 text-white p-4'>
			<div className='container w-[85%] mx-auto'>
				<div className='flex justify-between'>
					<h1 className='text-3xl font-bold font-mono text-black'>
						Res
					</h1>
					<div className='flex gap-4'>
						<Link
							className='flex items-center gap-1 border border-black px-2 rounded-xl'
							to={'/waiter'}
						>
							<HiHome className='text-black' />
							<p className='text-black'>Asosiy</p>
						</Link>
					</div>
					<Button type='primary' danger onClick={onLogout}>
						Log Out
					</Button>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
