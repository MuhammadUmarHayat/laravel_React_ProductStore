import Header from './Header';
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
function AddProduct()
{
//`name`, `file_path`, `description`, `price`,

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  async function add()
  {
const formData=new FormData();
formData.append('name',name);
formData.append('description',description);
formData.append('price',price);
formData.append('file',file);

let result=await fetch("http://127.0.0.1:8000/api/addProduct",{
  method:'POST',
  body:formData
});
alert("Product has been added");
  }
  return (
    <div>
      <Header />
      
      <div className="col-sm-6 offset-sm-3">
    <h1>Add Product</h1>
    <input 
        type="text" 
        className="form-control" 
        value={name}  
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter Name" 
      />
      <br/>
      <input 
        type="text" 
        className="form-control" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Enter Email" 
      />
      <br/>
      <input 
        type="text" 
        className="form-control" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Enter Email" 
      />
      <br/>
      <input 
        type="file" 
        className="form-control" 
              onChange={(e) => setFile(e.target.files[0])} 
        placeholder="Product photo" 
      />
     <br/>
      <button className="btn btn-success" onClick={add}>
        Add Product
      </button>
      <br/>
</div>
</div>
  ) 
}
export default AddProduct