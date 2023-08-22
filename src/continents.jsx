import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';

import TableView from "./tableView";
const LIST_CONTINENTS = gql`
  query {
    continents {
      name
      countries {
        name
        languages {
          native
          name
          code
        }
        phones
        emoji
        capital
        currency
      }
    }
  }
`;

export default function ContinentList() {
  const { data, loading, error } = useQuery(LIST_CONTINENTS);
  const [selectContinent, setSelectContinent] = useState()

  if (loading || error) {
    return <p>{error ? error.message : "Loading..."}</p>;
  }

  const handleContinentSelect=(e)=>{

    const findData = data.continents.find(continent=>{
       return continent.name
    })

     console.log(findData.name, '====', e.target.value)

  }

  return (
    <>

        <section>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-5 mt-3 pt-3 mb-3">
                  <Form.Select onChange={(e)=>handleContinentSelect(e)}>
                  <option>Select Continent</option>
                    {data.continents.map((continent, index) => {
                        return (
                          <option key={index} value={continent.name}>{continent.name}</option>
                        )})}
                  </Form.Select>
              </div>
            </div>
          </div>
        </section>
      <Accordion defaultActiveKey="0">
        {data.continents.map((continent, index) => {
          return (
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{continent.name}</Accordion.Header>
              <Accordion.Body>
                <TableView tableData={continent.countries} />
              </Accordion.Body>
            </Accordion.Item>
          );
        })} 
      </Accordion>
    </>
  );
}
