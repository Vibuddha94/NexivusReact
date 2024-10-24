import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import ProductType from "../../types/ProductType";
import axios from "axios";
import StockType from "../../types/StockType";

function CreateOrder() {
    const { isAuthenticated, jwtToken } = useAuth();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [stocks, setStocks] = useState<StockType[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(function () {
        if (isAuthenticated) {
            getProducts();
            getStocks();
        }
    }, [isAuthenticated])

    async function getProducts() {
        try {
            const response = await axios.get("http://localhost:8085/items", config);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getStocks() {
        try {
            const response = await axios.get("http://localhost:8085/stock", config);
            setStocks(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="w-page ">
            <div className="sticky top-0"><Navbar page="order" /></div>

            {/* Search Bar and Cart */}
            <div className=" flex gap-2 w-page md:mt-1 bg-slate-200 border-2 border-purple-800 md:m-auto m-2 md:mx-2 p-2 pe-5 rounded-lg text-center h-auto">
                {/* Search Bar */}
                <div>
                    <form className="flex  ml-10 my-2" >
                        <svg className="w-10 h-10 rounded-lg py-1 text-gray-800 shadow-md shadow-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                        </svg>

                        <input type="text" className="shadow-md shadow-gray-400 pl-5 py-1 rounded-lg " placeholder="Search Products" />
                    </form>
                </div>

                {/* Cart */}
                <div className="w-full my-auto text-right flex flex-row-reverse">
                    <label className="bg-red-500 rounded-xl text-white px-1 pt-2">{products.length}</label>
                    <button onClick={() => { setIsCartOpen(!isCartOpen) }} className="bg-gradient-to-r from-blue-600 to-sky-400 rounded-lg my-auto">
                        <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                        </svg>
                    </button>

                </div>
            </div>
            {/* Search Bar and Cart end */}

            {isCartOpen ? (
                
            <div className="grid grid-cols-2 h-auto">
           
            <div className=" md:grid md:grid-cols-1 lg:grid-cols-2  gap-2 w-page md:mt-2 bg-white border-2 border-purple-800 md:m-auto m-2 md:mx-2 p-2 pe-5 rounded-lg text-center h-auto">
                {products.map(function (product) {
                    const stockitem = stocks.find(stock => stock.item.id === product.id);
                    return (
                        //Block Start
                        <div className="w-full grid bg-white border-2 border-purple-800 md:m-auto m-2 md:mx-2 p-2  rounded-lg text-center h-auto">
                            <div className="border-2 border-sky-600 w-full rounded-lg font-bold text-lg">
                                <label >{product.name}</label>
                            </div>
                            <div className="grid grid-cols-2 gap-2 p-2  w-full mt-1 rounded-lg">
                                <label className="shadow-lg rounded-lg shadow-sky-300 font-semibold" >Description</label>
                                <label className="shadow-lg rounded-lg shadow-violet-300 text-sm ">{product.description}</label>
                                <label className="shadow-lg rounded-lg shadow-sky-300 font-semibold">Price</label>
                                <label className="shadow-lg rounded-lg shadow-violet-300 text-sm">{product.price}</label>
                                <label className="shadow-lg rounded-lg shadow-sky-300 font-semibold">QOH</label>
                                <label className="shadow-lg rounded-lg shadow-violet-300 text-sm">{stockitem?.qoh}</label>
                            </div>
                            <div className="grid grid-cols-2 gap-2  w-full mt-2 border-t-2 border-black pt-2 ">
                                <input type="text" className="shadow-md shadow-lime-400 pl-2 py-1 rounded-lg text-center" placeholder="Qty" />
                                <button type="button" className="bg-gradient-to-r from-green-600 to-lime-400 hover:bg-gradient-to-l rounded-full font-semibold text-white ">Add</button>
                            </div>
                        </div>
                        //Block End
                    )
                })}
            </div>
           

           
            <div className="grid  gap-2 h-max md:mt-2 bg-white border-2 border-purple-800 md:m-auto m-2 md:mx-2 p-2 pe-5 rounded-lg text-center ">
                <div className="grid">
                    <div className="shadow-md">
                        <div className="grid grid-cols-2 gap-2 my-1">
                            <label className=" text-left font-bold pl-4">Name</label>
                            <label className=" text-left font-bold pl-4">Description</label>
                        </div>
                        <div className="grid grid-cols-4 gap-2 my-1">
                            <label className=" font-semibold">Qty :</label>
                            <label className=" text-sm">qty</label>
                            <label className=" font-semibold">Price :</label>
                            <label className=" text-sm">price</label>
                        </div>
                    </div>
                    <div className="shadow-md">
                        <div className="grid grid-cols-2 gap-2 my-1">
                            <label className=" text-left font-bold pl-4">Name</label>
                            <label className=" text-left font-bold pl-4">Description</label>
                        </div>
                        <div className="grid grid-cols-4 gap-2 my-1">
                            <label className=" font-semibold">Qty :</label>
                            <label className=" text-sm">qty</label>
                            <label className=" font-semibold">Price :</label>
                            <label className=" text-sm">price</label>
                        </div>
                    </div>
                    <div className="shadow-md">
                        <div className="grid grid-cols-2 gap-2 my-1">
                            <label className=" text-left font-bold pl-4">Name</label>
                            <label className=" text-left font-bold pl-4">Description</label>
                        </div>
                        <div className="grid grid-cols-4 gap-2 my-1">
                            <label className=" font-semibold">Qty :</label>
                            <label className=" text-sm">qty</label>
                            <label className=" font-semibold">Price :</label>
                            <label className=" text-sm">price</label>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-2 border-t-2 border-black">
                        <label className=" text-left pl-5 font-bold">Total</label>
                        <label className=" text-right pe-5">total</label>
                    </div>
                </div>
            </div>
           
        </div>
       
            ): (
                
            <div className="">
            
            <div className="  md:grid md:grid-cols-3 sm:grid sm:grid-cols-2 gap-2 w-page md:mt-2 bg-white border-2 border-purple-800 md:m-auto m-2 md:mx-2 p-2 pe-5 rounded-lg text-center h-auto">
                {products.map(function (product) {
                    const stockitem = stocks.find(stock => stock.item.id === product.id);
                    return (
                        //Block Start
                        <div className="w-full grid bg-white border-2 border-purple-800 md:m-auto m-2 md:mx-2 p-2  rounded-lg text-center h-auto">
                            <div className="border-2 border-sky-600 w-full rounded-lg font-bold text-lg">
                                <label >{product.name}</label>
                            </div>
                            <div className="grid grid-cols-2 gap-2 p-2  w-full mt-1 rounded-lg">
                                <label className="shadow-lg rounded-lg shadow-sky-300 font-semibold" >Description</label>
                                <label className="shadow-lg rounded-lg shadow-violet-300 text-sm ">{product.description}</label>
                                <label className="shadow-lg rounded-lg shadow-sky-300 font-semibold">Price</label>
                                <label className="shadow-lg rounded-lg shadow-violet-300 text-sm">{product.price}</label>
                                <label className="shadow-lg rounded-lg shadow-sky-300 font-semibold">QOH</label>
                                <label className="shadow-lg rounded-lg shadow-violet-300 text-sm">{stockitem?.qoh}</label>
                            </div>
                            <div className="grid grid-cols-2 gap-2  w-full mt-2 border-t-2 border-black pt-2 ">
                                <input type="text" className="shadow-md shadow-lime-400 pl-2 py-1 rounded-lg text-center" placeholder="Qty" />
                                <button type="button" className="bg-gradient-to-r from-green-600 to-lime-400 hover:bg-gradient-to-l rounded-full font-semibold text-white ">Add</button>
                            </div>
                        </div>
                        //Block End
                    )
                })}
            </div>
                      
            {/* <div className="grid hidden gap-2 w-page md:mt-2 bg-white border-2 border-purple-800 md:m-auto m-2 md:mx-2 p-2 pe-5 rounded-lg text-center h-auto">
                <div>
                    <div>
                        <div className="grid grid-cols-2 gap-2">
                            <label className=" ">Name</label>
                            <label className=" ">Description</label>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            <label className=" ">Qty</label>
                            <label className=" ">qty</label>
                            <label className=" ">Price</label>
                            <label className=" ">price</label>
                        </div>
                    </div>
                    <div>
                        <label className=" ">Total</label>
                        <label className=" ">total</label>
                    </div>
                </div>
            </div> */}
           
        </div>
        
            )}


            

        </div>

    )
}

export default CreateOrder;