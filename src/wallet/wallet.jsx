import Web3 from "web3"
import { useNavigate } from "react-router-dom"
import ABI from './ABI.json'
import './wallet.css'
//admin--->0x0753624CB48491eeD67385C08f37Ad421458c7f6
//producer--->0x7ef5E25894071bddA1729778168BB9804eb9E8B1
//distributor--->0x1Cd99eBC39d009bC49628f80ED362A03e7f15a4d
//retailer--->0x58B0ec5FE30b8907ba6B5663d84370Bdf939C943
//name:ps5,modelno:035,company:sony,manufactured:2024
const Wallet=({saveState})=>{
    const navigateTo=useNavigate();
    const connectWallet= async()=>{
        try{
            console.log(Web3)
            if(window.ethereum){
                const web3=new Web3(window.ethereum)
                const accounts= await window.ethereum.request({
                    method:"eth_requestAccounts"
                })
                const contractAddress= "0x1Cd99eBC39d009bC49628f80ED362A03e7f15a4d"
                const contract= new web3.eth.Contract(ABI,contractAddress)
                saveState({web3:web3,contract:contract,account:accounts[0]})
                navigateTo("/view-product")
            }else{
                throw new Error
            }
        }catch(error){
            console.error(error)
        }
    }
    return<>
     <div className="wallet-container">
            <p className="wallet-message">Please connect your MetaMask wallet to access the app.</p>
            <button className="connect-button" onClick={connectWallet}>Connect Wallet</button>
        </div>
    </>

}
export default Wallet