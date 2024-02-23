import React, { useState } from 'react'
import '../AddProduct/AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

export const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const imageHandle = (e) =>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails,[e.target.name] : e.target.value
        })
    }

    const AddProduct = async () => {
        console.log(productDetails);
    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input type="text" value={productDetails.old_price} onChange={changeHandler} name="old_price" placeholder='Type here'/>
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input type="text" value={productDetails.new_price} onChange={changeHandler} name="new_price" placeholder='Type here'/>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select name="category" value={productDetails.category} onChange={changeHandler} className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor='file-input'>
                <img src={image ? URL.createObjectURL(image) : upload_area} className='addproudct-thumnail-img' alt="" />
            </label>
            <input onChange={imageHandle} type="file" name='image' id='file-input' hidden/>
        </div>
        <button className='addproduct-btn' onClick={()=>{AddProduct()}}>Add</button>
    </div>
  )
}
