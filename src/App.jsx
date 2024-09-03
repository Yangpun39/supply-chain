import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Wallet from './wallet/wallet'
import Product from './product/product'
import Update from './product/update'
import Viewproducts from './profile/profile'
import './App.css'

// 
function App() {
  const [state,setState]=useState({web3:null,contract:null,account:null})
  const saveState=({web3,contract,account})=>{
    setState({web3:web3,contract:contract,account:account})
  }
  
  const router= createBrowserRouter([{
    path:'/',element:<Wallet saveState={saveState}/>},
    {path:'/view-product',element:<Viewproducts  state={state}/>},
    {path:'/create-product',element:<Product state={state}/>},
    {path:'/update-product',element:<Update state={state}/>}
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
