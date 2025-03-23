import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cook from '../pages/cook'
import Login from '../pages/login'
import OrderPage from '../pages/orderPage'
import Waiter from '../pages/waiter'

const Router = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/cook' element={<Cook />} />
			<Route path='/waiter' element={<Waiter />} />
			<Route path='/order/:id' element={<OrderPage />} />
		</Routes>
	)
}

export default Router
