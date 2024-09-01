import Header from "./Header";
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function ProductList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Delete function
  async function deleteproduct(id) {
    let result = await fetch("http://127.0.0.1:8000/api/deleteproduct/" + id, {
      method: 'DELETE'
    });
    result = await result.json();
    console.log(result); // Optional: to see the result in the console
    getData();
  }

  async function getData() {
    let result = await fetch("http://127.0.0.1:8000/api/productlist");
    result = await result.json();
    setData(result);
  }

  return (
    <div>
      <Header />
      <h1>Product List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Photo</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <img
                  style={{ width: 100 }}
                  src={"http://localhost:8000/" + item.file_path}
                  alt="product"
                />
              </td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>
                <span className="delete" onClick={() => deleteproduct(item.id)}>
                  Delete
                </span>
              </td>
              <td>
                <Link to={"update/"+item.id}>
                <span className="update" >
                  Edit
                </span>
                </Link>
               
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
