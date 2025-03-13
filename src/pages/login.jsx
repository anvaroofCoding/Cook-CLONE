import { Button, Form, Input, notification } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { users } from '../constants'

const Login = ({ onLogin }) => {
	const navigate = useNavigate()
	const [api, contextHolder] = notification.useNotification()

	const loginHandle = values => {
		const findUser = users.find(
			user =>
				user.username === values.username &&
				user.password === values.password
		)

		if (!findUser) {
			api.error({
				message: 'Login Failed!',
				description: 'Invalid username or password!',
				placement: 'topRight',
			})
		} else {
			localStorage.setItem('user', JSON.stringify(findUser))
			localStorage.setItem('isAuthenticated', 'true')

			api.success({
				message: 'Login Successful!',
				description: `Welcome, ${findUser.username}!`,
				placement: 'topRight',
			})

			onLogin(findUser.role)
			if (findUser.role === 'oshpaz') {
				navigate('/cook')
			} else if (findUser.role === 'waiter') {
				navigate('/waiter')
			}
		}
	}

	return (
		<div
			className='w-full h-screen flex justify-center items-center bg-cover bg-center'
			style={{
				backgroundImage: `url('https://cache.marriott.com/content/dam/marriott-renditions/LAXBW/laxbw-prime-1715-hor-wide.jpg?output-quality=70&interpolation=progressive-bilinear&downsize=1336px:*')`,
			}}
		>
			{contextHolder}
			<div className='border w-110 border-gray-400 px-7 py-3 rounded-xl hover:shadow-2xl cursor-pointer backdrop-blur-sm bg-white/50'>
				<h1 className='text-2xl font-mono text-center my-4'>Login</h1>
				<Form
					size='large'
					onFinish={loginHandle}
					autoComplete='off'
					layout='vertical'
				>
					<Form.Item
						label='Username'
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						label={null}
						style={{ display: 'flex', justifyContent: 'center' }}
					>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	)
}

export default Login
