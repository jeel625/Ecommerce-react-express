import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrums/Breadcrum';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay';
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts';

export const Product = () => {

const { allProduct } = useContext(ShopContext);
  const { productId } = useParams();

  
  console.log("Products from the Product",allProduct);

  const product = allProduct.find((e) => e.id === Number(productId))

  return (
    <div >
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}
