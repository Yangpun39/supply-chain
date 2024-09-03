import React,{useState,useEffect} from "react";
import Navigation from "../wallet/naviagtion";
import { create } from 'ipfs-http-client';
import './product.css'
// Connect to the local IPFS node
const ipfs = create({ host: '127.0.0.1', port: '5001', protocol: 'http' });
const Product=({state})=>{
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
    const {contract,account}=state;
    const handleSubmit = async (event) => {
      event.preventDefault();

      // Create JSON object from form data
      const jsonData = {
          description: description
      };

      // Convert JSON to Blob
      const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

      try {
          // Upload JSON to IPFS
          const result = await ipfs.add(jsonBlob);
          setStatus('Upload successful!');
          setIpfsHash(result.path); 
          console.log(ipfsHash)// Display the IPFS CID
      } catch (error) {
          setStatus('Upload failed!');
          console.error('Error uploading to IPFS:', error);
      }
  };
    const create_product=async()=>{
        const product= await contract.methods.create_product(ipfsHash).send({from:account})
    }
    return(
        <>
            <div className="product-container">
            <Navigation className="navigation" />
            <div className="form-container">
                <h1>Upload JSON to IPFS</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    /><br /><br />
                    <button type="submit">Upload</button>
                </form>
                <p className="status-message">{status}</p>
            </div>
            <button className="create-product-button" onClick={create_product}>Create</button>
        </div>
        </>
    )
}
export default Product