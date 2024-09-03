import React,{useState,useEffect} from "react";
import Navigation from "../wallet/naviagtion";
import './update.css'
const Update=({state})=>{
    const {contract,account}=state;
    const [id,setid] = useState(0);
    
    const update_product=async()=>{
        const product= await contract.methods.updateprod(id).send({from:account})
    }
    return(
        <>
         <div className="update-container">
            <Navigation />
            <div>
                <input
                    type="number"
                    className="update-input"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    placeholder="Enter product number"
                />
                <button className="update-button" onClick={Update}>Update</button>
            </div>
        </div>

        </>
    )
}
export default Update