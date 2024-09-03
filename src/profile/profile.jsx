import React,{useState,useEffect} from "react";
import Navigation from "../wallet/naviagtion";
import { create } from 'ipfs-http-client';
import './profile.css'
const Viewproducts=({state})=>{
  const [products, setProducts] = useState([]);
  const {contract,account}=state;
 // const [cid, setCid] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [status, setStatus] = useState('');

  const handleRetrieve = async(event) => {
      event.preventDefault();

      try {
        console.log(event.data)
          setStatus('Retrieving data...');
          
          // Retrieve data from IPFS using the CID
          const stream = ipfs.cat(event.hash);
          let data = '';

          for await (const chunk of stream) {
              data += new TextDecoder().decode(chunk);
          }

          const parsedData = JSON.parse(data);
          setJsonData(parsedData);
          console.log(jsonData)
          setStatus('Data retrieved successfully!');
      } catch (error) {
          setStatus('Failed to retrieve data!');
          console.error('Error retrieving from IPFS:', error);
      }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsArray = await contract.methods.getAllProfiles().call();
        setProducts(productsArray);
        console.log(products)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [state]);

  return (
    <div>
    <Navigation/>
    <h1>Product List</h1>
    {products.length > 0 ? (
      products.map((product,index) => {
        return(
              <div
              className="view_all_tasks_card"
              key={index}
              >
              <h3>{index+1}</h3>
              {product.hash}{handleRetrieve(product.hash)&& (
              <div>
                  <pre>{JSON.stringify(jsonData, null, 2)}</pre>
              </div>
          )}
              <p>{product.status}</p>
              </div>
          )})
    ) : (
      <p>No products available</p>
    )}
  </div>
  
  );
};
export default Viewproducts
//handleRetrieve(product.hash)&&JSON.stringify(jsonData, null, 2)