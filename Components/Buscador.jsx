import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hits, InstantSearch, RefinementList, SearchBox } from 'react-instantsearch';
import React from 'react'

const searchClient = algoliasearch('K098XXHXX8', '2b3c7a8e3317d15c342293c44354b7ea');

const customSearchClient = {
    ...searchClient,
    search(requests) {
        // Si la consulta está vacía, no hacemos una búsqueda
        if (requests.every(({ params }) => !params.query)) {
            return Promise.resolve({
                results: requests.map(() => ({
                    hits: [],
                    nbHits: 0,
                })),
            });
        }
        return searchClient.search(requests);
    },
};

function Hit({ hit }) {
    return (
        <div style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            <h5 style={{ margin: 0 }}>{hit.title}</h5>
            <p style={{margin: 0, color: '#666', fontSize: 13 }}>{hit.description}</p>
            <p style={{margin: 0, fontSize: 13 }}>{hit.price}€</p>
        </div>
    );
}

export function Buscador() {
  return (
    <div>
            <InstantSearch searchClient={customSearchClient} indexName="id">
                <SearchBox>

                </SearchBox>
                <div style={{
                            position: 'absolute', // Se posiciona respecto al contenedor
                            top: '145%', // Justo debajo del SearchBox
                            right: 10, // Se alinea a la derecha del contenedor
                            width: '400px', // Puedes ajustar el ancho según tu diseño
                            backgroundColor: '#fff',
                            border: '1px solid #ddd',
                            overflow: 'hidden',
                            borderRadius: '5px',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                            maxHeight: '300px', // Límite para evitar que ocupe demasiado espacio vertical
                            overflowY: 'auto', // Scroll solo vertical si es necesario
                            whiteSpace: 'normal', // Previene scroll horizontal
                            zIndex: 1000, // Asegura que esté sobre otros elementos
                        }}>
                    <Hits hitComponent={Hit} />
                </div>

            </InstantSearch>
        </div>
  );
}