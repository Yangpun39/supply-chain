import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

// Connect to the local IPFS node
const ipfs = create({ host: '127.0.0.1', port: '5001', protocol: 'http' });

function RetrieveForm() {
    const [cid, setCid] = useState('');
    const [jsonData, setJsonData] = useState(null);
    const [status, setStatus] = useState('');

    const handleRetrieve = async (event) => {
        event.preventDefault();

        try {
            setStatus('Retrieving data...');
            
            // Retrieve data from IPFS using the CID
            const stream = ipfs.cat(cid);
            let data = '';

            for await (const chunk of stream) {
                data += new TextDecoder().decode(chunk);
            }

            const parsedData = JSON.parse(data);
            setJsonData(parsedData);
            setStatus('Data retrieved successfully!');
        } catch (error) {
            setStatus('Failed to retrieve data!');
            console.error('Error retrieving from IPFS:', error);
        }
    };

    return (
        <div>
            <h2>Retrieve JSON from IPFS</h2>
            <form onSubmit={handleRetrieve}>
                <label htmlFor="cid">IPFS CID:</label>
                <input
                    type="text"
                    id="cid"
                    value={cid}
                    onChange={(e) => setCid(e.target.value)}
                    required
                /><br /><br />
                <button type="submit">Retrieve</button>
            </form>
            <p>{status}</p>
            {jsonData && (
                <div>
                    <h3>Retrieved Data:</h3>
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default RetrieveForm;
