import { BrowserRouter } from 'react-router-dom';
// import { UserRouter, AdminRouter } from '../routes';
import UserRouter from '../routes/userRouter/UserRouter';
import AdminRouter from '../routes/adminRouter/AdminRouter';
import { useEffect } from 'react';
const App = () => {
	useEffect(() => {
		if (!localStorage.getItem('lang')) {
			localStorage.setItem('lang', 'kor');
		}
	}, []);
	return (
		<BrowserRouter>
			<UserRouter />
			<AdminRouter />
		</BrowserRouter>
	);
};

export default App;
