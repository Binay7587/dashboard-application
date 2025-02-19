import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import NoPageFound from "./components/NoPageFound"
import Dashboard from "./pages/Dashboard"
import ProductsPage from "./pages/ProductsPage"
import UsersPage from "./pages/UsersPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
