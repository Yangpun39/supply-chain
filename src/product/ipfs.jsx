import { useState } from 'react'
import { create } from 'ipfs-http-client';
// Connect to the local IPFS node
const ipfs = create({ host: '127.0.0.1', port: '5001', protocol: 'http' });
function Ipfs({saveState}) {
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');

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
          saveState({ipfsHash});
          console.log(ipfsHash)// Display the IPFS CID
      } catch (error) {
          setStatus('Upload failed!');
          console.error('Error uploading to IPFS:', error);
      }
  };

  return (
      <div>
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
          <p>{status}</p>
      </div>
  );
}

export default Ipfs
