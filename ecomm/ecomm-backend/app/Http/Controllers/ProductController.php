<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    function addProduct(Request $req)
    {
        $product = new Product;
        $product->name = $req->input('name');
        $product->description = $req->input('description');
        $product->price = $req->input('price');
        $product->file_path = 'storage/' . $req->file('file')->store('products', 'public');
        $product->save();
        return $product;
    }

    function list()
    {
        return Product::all();
    }
    function getProduct($id)
    {
        return Product::find($id);
    }

    
    public function delete($id)
    {
        $product = Product::find($id);

        if ($product) {
            $product->delete();
            return response()->json(['result' => 'Product has been deleted'], 200);
        } else {
            return response()->json(['result' => 'Product not found'], 404);
        }
    }
    public function searchProduct($key)
    {
return Product::where('name','like',"%$key%")->get();
    }
    function update(Request $req, $id)
    {
        // Fetch the existing product by its ID
        $product = Product::find($id);
    
        // Check if product exists
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        // Update product fields
        $product->name = $req->input('name');
        $product->description = $req->input('description');
        $product->price = $req->input('price');
    
        // Handle file upload if a new file is provided
        if ($req->hasFile('file')) {
            $product->file_path = 'storage/' . $req->file('file')->store('products', 'public');
        }
    
        // Save the updated product
        $product->save();
    
        // Return the updated product
        return $product;
    }
    
}
