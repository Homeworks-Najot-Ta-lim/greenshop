"use client"
import HeroSwiper from "@/components/MainSwiper";
import ProductItem from "@/components/ProductItem";
import getProducts from "@/services/getAllProducts";
import getCategories from "@/services/getCategoriesService";
import { CategoryType } from "@/types/CategoryType";
import { ProductType } from "@/types/ProductType";
import { Button, Pagination, Slider } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [categoryId,setCategoryId] = useState<string | null>(null)
  const [page,setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(6)
  const [minPrice,setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [price, setPrice] = useState<number[]>([38,1235])

  const [activeItem, setActiveItem] = useState<string>("")
  const categories: CategoryType[] = getCategories()
  const {products, total_count} = getProducts(categoryId,page,limit,minPrice,maxPrice)
console.log(products)
  function handleCategoryItemClick(data: CategoryType){
    setActiveItem(data.category_name)
    if(data.category_name !="All"){
      setCategoryId(data.category_name)
    } else {
      setCategoryId(null)
    }
  }

  function handlePaginationChange(current: number){
    setPage(current)
  }
  function handleFilterProductsByPrice(){
    setMaxPrice(price[1])
    setMinPrice(price[0])
  }


  return (
    <>
        <HeroSwiper />
        <div className="flex w-[1250px] mx-auto mt-5">
            <div className="w-[30%] p-[14px] bg-[#fbfbfb]">
              <h2 className="font-bold text-[18px]">Categories</h2>
              <ul>
                  {categories.map((item: CategoryType, index: number)=><li onClick={()=>handleCategoryItemClick(item)} className={`leading-[40px] cursor-pointer font-normal text-[15px] ${activeItem === item.category_name && "text-[#46a358] !font-bold"}`} key={index}>{item.category_name}</li>)}
              </ul>
              <div>
                <Slider min={38} max={1600} onChange={(value)=>setPrice(value)}  range defaultValue={[38,1235]}/>
                <p className="my-2">Price:<span className="text-green-600 font-bold">${`${price[1]}-${price[0]}`}</span></p>
                <Button onClick={handleFilterProductsByPrice} htmlType="button" size="large" type="primary">Filter</Button>
                <div className="w-full container my-2">
                    <p className="font-bold my-3">Size</p>
                    <div className="w-full flex items-center flex-col justify-center gap-4 font-[100]">
                      <li className="flex w-full items-center justify-around"><p>Small</p><p>(119)</p></li>
                      <li className="flex w-full items-center justify-around"><p>Medium</p><p>(86)</p></li>
                      <li className="flex w-full items-center justify-around"><p>Large</p><p>(78)</p></li>
                    </div>
                </div>
                <div className="mt-10 w-full flex items-center justify-center flex-col bg-[linear-gradient(180deg,rgba(70,163,88,0.1)_0%,rgba(70,163,88,0.03)_100%)]">
                    <Image src="/SuperSale.png" alt="super sale image" width={266} height={65}/>
                    <Image src="/saleImage.png" alt="super sale image" width={370} height={370}/>
                </div>
              </div>
            </div>
            <div className="w-[70%] p-5">
                  <ul className="flex flex-wrap gap-10 justify-between">
                      {products ? products.map((item:ProductType)=> <ProductItem  key={item.product_id} item={item}/>): "Emty Product"}
                  </ul>
                  <div className="flex justify-end my-5">
                      <Pagination onChange={handlePaginationChange} pageSize={limit} defaultCurrent={page} total={total_count}/>
                  </div>


                 
            </div>
        </div>


      <div className="flex w-[1250px] mx-auto mt-5">
qsqdsqsqsq
      </div>
    </>
  );
}
