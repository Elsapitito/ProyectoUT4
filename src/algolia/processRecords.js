import { algoliasearch } from 'algoliasearch';

const client = algoliasearch('K098XXHXX8', '2b3c7a8e3317d15c342293c44354b7ea');

// Fetch and index objects in Algolia
const processRecords = async () => {
  const datasetRequest = await fetch('https://fakestoreapi.com/products');
  const products = await datasetRequest.json();
  return await client.saveObjects({ indexName: 'id', objects: products });
};

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error(err));