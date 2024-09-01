import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import AddProduct from './AddProduct';
import Register from './Register';
import UpdateProduct from './UpdateProduct';
import Protected from './Protected';
import ProductList from './ProductList';
import SearchProduct from './SearchProduct';
function App() {
  return (
    <div className="App">
      <h1>Ecommerce Project By Hafiz Muhammad Umar Hyaat</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Protected><SearchProduct /></Protected>} />
          <Route path="/add" element={<Protected><AddProduct /></Protected>} />
          <Route path="/update/:id" element={<Protected><UpdateProduct /></Protected>} />
          <Route path="/" element={<Protected><ProductList /></Protected>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
