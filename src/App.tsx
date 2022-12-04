import React, {FC} from 'react';
import './App.css';
import {LoginForm} from './components/LoginForm';
export const App: FC = () => {
	return (
		<div className="App">
			<header className="App-header">
				<p>Hello, world</p>
				<LoginForm />
			</header>
		</div>
	);
};
