import Header from './Header';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate to redirect after update
import { useState, useEffect } from 'react';

function UpdateProduct() 
{
  const { id } = useParams(); // Get the product ID from the route parameters
  const navigate = useNavigate(); // Hook for navigation
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    file: null
  });

  useEffect(() => 
  {
    async function fetchData() 
    {
      let result = await fetch("http://127.0.0.1:8000/api/product/" + id, {
        method: 'GET'
      });
      result = await result.json();
      setData(result);
    }

    fetchData();
  }, [id]); // Dependency array includes `id` to re-fetch if `id` changes

  async function updateData() 
  {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);

    if (data.file) {
      formData.append('file', data.file);
    }

    let result = await fetch("http://127.0.0.1:8000/api/update/" + id, {
      method: 'POST', 
      body: formData
    });

    result = await result.json();
    console.log(result);

    // Redirect to product list or show success message
    navigate("/");
  }

  return (
    <div>
      <Header />
      <h1>Update Product</h1>
      <div>
        <input 
          type="text" 
          className="form-control" 
          value={data.name} 
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Enter Name" 
        />
        <br/>
        <input 
          type="text" 
          className="form-control" 
          value={data.description} 
          onChange={(e) => setData({ ...data, description: e.target.value })}
          placeholder="Enter Description" 
        />
        <br/>
        <input 
          type="text" 
          className="form-control" 
          value={data.price} 
          onChange={(e) => setData({ ...data, price: e.target.value })}
          placeholder="Enter Price" 
        />
        <br/>
        <input 
          type="file" 
          className="form-control" 
          onChange={(e) => setData({ ...data, file: e.target.files[0] })} 
          placeholder="Product photo" 
        /> 
        <img
          style={{ width: 100 }}
          src={"http://localhost:8000/" + data.file_path}
          alt="product"
        />
        <br/>
        <button className="btn btn-success" onClick={updateData}>
          Update Product
        </button>
      </div>
    </div>
  );
}

export default UpdateProduct;
