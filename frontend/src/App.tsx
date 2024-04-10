import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RouteType } from "./pages";
import { Navbar } from "./components";
import { routes } from "./pages";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={routes[0].component} />

          {...routes.map((route: RouteType) => <Route path={route.path} element={route.component} />)}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
