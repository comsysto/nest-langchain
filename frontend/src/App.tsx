import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import { Home, RouteType } from './pages';
import { Navbar } from './components';
import { routes } from './pages'

function App() {

	return (
		<ChakraProvider>
			<BrowserRouter>
			<Navbar />
				<Routes>
						<Route path='/' element={<Home />}/>

						{
							...Object.values(routes).map((route : RouteType) => 
								<Route path={route.path} element={route.component} />
							)
						}
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
