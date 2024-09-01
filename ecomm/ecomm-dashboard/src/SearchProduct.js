import Header from './Header';
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

function SearchProduct() 
{
  const [data, setData] = useState([]); // Initialize as an empty array
  const [searchKey, setSearchKey] = useState(""); // Store the current search key

  useEffect(() => {
    getData();
  }, []);

  async function search(key) {
    setSearchKey(key);
    if (key) {
      let result = await fetch("http://127.0.0.1:8000/api/search/" + key);
      result = await result.json();
      setData(result);
    } else {
      getData(); // Fetch all products if the search key is empty
    }
  }

  async function deleteproduct(id) {
    let result = await fetch("http://127.0.0.1:8000/api/deleteproduct/" + id, {
      method: 'DELETE'
    });
    result = await result.json();
    console.log(result);
    search(searchKey); // Refresh search results after deletion
  }

  async function getData() {
    let result = await fetch("http://127.0.0.1:8000/api/productlist");
    result = await result.json();
    setData(result);
  }

  return (
    <div>
      <Header />
      <div>
        <input
          type='text'
          placeholder='Search product'
          className='form-control'
          onChange={(e) => search(e.target.value)}
        />

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
            {data.length > 0 ? (
              data.map((item, index) => (
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
                  <Link to={`/update/${item.id}`}>
                      <span className="update">Edit</span>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No products found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SearchProduct;
