import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import NoPageFound from "./components/NoPageFound"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<div>Products</div>} />
          <Route path="users" element={<div>Users</div>} />
        </Route>
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
