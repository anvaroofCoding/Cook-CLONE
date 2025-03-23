import React from 'react'
import { FaInstagram, FaTelegramPlane } from 'react-icons/fa'
const Footer = () => {
	return (
		<nav className='fixed w-full bottom-0 backdrop-blur-sm bg-white/40 border border-t-black/60 text-white p-4'>
			<div className='container w-[85%] mx-auto'>
				<div className='flex justify-between'>
					<p className='text-black'>© 2025 All Rights Reserved</p>
					<div className='flex gap-4'>
						<a
							href='https://t.me/yourtelegram'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaTelegramPlane className='text-2xl hover:text-blue-400 text-blue-500 transition' />
						</a>
						<a
							href='https://instagram.com/yourinstagram'
							target='_blank'
							rel='noopener noreferrer'
						>
							<FaInstagram className='text-2xl hover:text-pink-500 text-pink-600 transition' />
						</a>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Footer
