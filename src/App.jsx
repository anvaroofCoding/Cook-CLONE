import React, { useState } from 'react'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Login from './pages/login'
import MainRouter from './router/Router'

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		() => localStorage.getItem('isAuthenticated') === 'true'
	)

	const handleLogin = userRole => {
		setIsAuthenticated(true)
		localStorage.setItem('isAuthenticated', 'true')
		localStorage.setItem('userRole', userRole)
	}

	const handleLogout = () => {
		setIsAuthenticated(false)
		localStorage.removeItem('isAuthenticated')
		localStorage.removeItem('userRole')
		localStorage.removeItem('user')
	}

	return (
		<Router>
			{isAuthenticated && <Navbar onLogout={handleLogout} />}{' '}
			<Routes>
				<Route
					path='/login'
					element={<Login onLogin={handleLogin} />}
				/>
				{isAuthenticated ? (
					<Route path='/*' element={<MainRouter />} />
				) : (
					<Route
						path='/*'
						element={<Navigate to='/login' replace />}
					/>
				)}
			</Routes>
			{isAuthenticated && <Footer />}
		</Router>
	)
}

export default App
