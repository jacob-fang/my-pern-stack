import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"

import { Route, Routes } from 'react-router-dom'


function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  )
}


export default App