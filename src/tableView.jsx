import Table from "react-bootstrap/Table";
import React,{useEffect, useState} from "react";
import Pagination from 'react-bootstrap/Pagination';

 const TableView=({tableData})=>{

    // SEARCH METHOD
    const [search, setSearch] = useState("")
    const handleSearch = (e)=>{
        const inputValue = e.target.value;
        setSearch(inputValue);
    }
  

    const filterResult = tableData.filter(value =>  {
        return (value.name?.toLowerCase().includes(search?.toLowerCase()) ||
        value.capital?.toLowerCase().includes(search?.toLowerCase()) ||
         value.emoji?.toLowerCase().includes(search?.toLowerCase()) ||
         value.currency?.toLowerCase().includes(search?.toLowerCase()))
        })

    //SORTING METHOD
    const tableHeaders = [
        'Name',
        'Emoji',
        'Capital',
        'Currency'
    ]
    const [sortedField, setSortedField] = useState(null);
    const [sortOrder, setSortOrder] = useState("def");
    const handleSortingMethod = (field) => {
        if (sortedField === field) {
          setSortOrder(
            sortOrder === "ASC" ? "DSC" : sortOrder === "DSC" ? "Default" : "ASC"
          );
        } else {
          setSortedField(field);
          setSortOrder("ASC");
        }
      };


    const sortedData = sortedField
        ? filterResult
            .slice()
            .sort((a, b) =>{
                return  sortOrder === "ASC"
                ? a[sortedField?.toLowerCase()]?.localeCompare(b[sortedField?.toLowerCase()])
                : sortOrder === "DSC"
                ? b[sortedField?.toLowerCase()]?.localeCompare(a[sortedField?.toLowerCase()])
                : null
            }
        )
        : filterResult;
    

    // PAGINATION CODE =====
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(5);
    const [displayData, setDisplayData] = useState(tableData)
    const lastIndex = currentPage * perPage
    const firstIndex = lastIndex - perPage
    const newPage = Math.ceil(sortedData.length / perPage)
    const numbers = [...Array(newPage + 1 ).keys()].slice(1)

    // PAGINATION METHOD
    const prevPage =()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1)
        }
    }
    const NextPage =()=>{
        if(currentPage < newPage){
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            <div>
                <form className="col-md-10">
                    <div className="row">
                        <div className="col-md-6 d-flex align-items-center">
                            <label className="form-label me-2 fw-bold">Search</label>
                            <input type="text" className="form-control" value={search || ""} name='search' onChange={(e)=>handleSearch(e)} />
                        </div>
                    </div>
                </form>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    {tableHeaders.map(thData=>{
                        return  <th  onClick={()=>handleSortingMethod(thData)}>{thData}
                        {sortOrder === "ASC" ? "🔼" : sortOrder === "DSC" ? '🔽' : ''}
                        </th>
                    })}
                   
                </tr>
                </thead>
                <tbody>
                {sortedData.slice(firstIndex, lastIndex).map((data) => {
                    return (
                    <tr>
                        <td>{data.name}</td>
                        <td>{data.emoji}</td>
                        <td>{data.capital}</td>
                        <td>{data.currency}</td>
                    </tr>
                    );
                })}
                </tbody>
            </Table>
            <Pagination>
                <Pagination.Prev onClick={prevPage}/>
                {numbers.map(num=>{
                        return  <Pagination.Item onClick={()=> setCurrentPage(num)} className={currentPage === num ? "active" : ''}>{num}</Pagination.Item>
                    })}
                <Pagination.Next onClick={NextPage}/>
            </Pagination>
        </>
        )
 }


 export default TableView