import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [organizations, setOrganizations] = useState([]);
  
  const handleClick = () => {
    fetchOrganizations();
  }
  
  const fetchOrganizations = () => {
    axios({
      url: process.env.REACT_APP_MIDDLEWARE_URL + 'sparql',
      method: 'POST',
      data: `
        PREFIX as: <https://www.w3.org/ns/activitystreams#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX ldp: <http://www.w3.org/ns/ldp#>
        PREFIX schema: <http://schema.org/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX pair: <http://virtual-assembly.org/ontologies/pair#>
        PREFIX semapps: <http://semapps.org/ns/core#>
        PREFIX oasis: <http://cooperative-oasis.org/ns/core#>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX petr: <https://data.petr-msb.data-players.com/ontology#>
        CONSTRUCT {
          ?s1 ?p2 ?o2 .
        }
        WHERE {
          ?s1 a ?type .
          FILTER( ?type IN (pair:Organization) ) .
          FILTER( (isIRI(?s1)) ) .
          ?s1 ?p2 ?o2 .
        }`,
      headers: {
          'Content-Type': 'application/ld+json'
      },
    })
      .then((res) => {
        console.log('ok', res);
        if (res.data['@graph']) {
          setOrganizations(res.data['@graph']);
        } else {
          setOrganizations([res.data]);
        }
      })
      .catch((err) => {
        console.log('ko', err);
      });
  }
  
  console.log(organizations);
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleClick}>Click</button>
        <ul>
          {
            organizations.map((organization, key) => {
              return(<li key={key} style={{textAlign:'left'}}>{organization.label}</li>);
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
