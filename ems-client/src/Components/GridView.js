import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import React, { useState } from "react";
import styled from "styled-components";
import { GET_EMPLOYEES } from "../graphql/employeeQueries";

const GridContainer = styled.div`
  background-color: #ffffff;
  color: black;
  width: 300px;
  padding: 10px;
  font-size: 12px;
  flex:1;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const GridHeader = styled.div`
  background-color: #d11d1d;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 5px;
  color: white;
`;

const GridItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  cursor: pointer;
  background-color: ${({ selected }) =>
    selected ? "#d8a4a4" : "transparent"};

  &:hover {
    background-color: #d8a4a4;
  }
`;

const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const sampleData = Array.from({ length: 50 }, (_, index) => {
  const departments = ["HR", "Finance", "IT", "Marketing", "Sales"];
  const emaildomain = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "aol.com"];
  const genders = ["Male", "Female", "Other"];
  return {
    id: index + 1,
    name: `Employee ${index + 1}`,
    department: departments[index % departments.length],
    email: `employee${index + 1}@${emaildomain[index % emaildomain.length]}`,
    phone: `555-010-${(index + 1).toString().padStart(2, "0")}`,
    hiredate: `2020-${((index % 12) + 1).toString().padStart(2, "0")}-${((index % 28) + 1).toString().padStart(2, "0")}`,
    salary: `$${(50000 + (index * 1000)).toLocaleString()}`,
    birthdate: `1990-${((index % 12) + 1).toString().padStart(2, "0")}-${((index % 28) + 1).toString().padStart(2, "0")}`,
    gender: genders[index % genders.length]
  };
});

function GridView({ onSelectItem }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [selectedId, setSelectedId] = useState(null);

   const handleClick = (item) => {
    setSelectedId(item.employee_id);
    onSelectItem(item);
  };

  const { data, loading, error } = useQuery(GET_EMPLOYEES, {
      variables: {
        page,
        limit: itemsPerPage,
        sortBy: "name",
        sortOrder: "ASC",
      },
    });
    const currentItems =  data?.employees || [];
    if (loading) return <GridContainer>Loading...</GridContainer>;
    if (error) return error.message;

  return (
    <GridContainer>
      <GridHeader>
        <div>Employee Name</div>
        <div>Department</div>
      </GridHeader>
      <div style={{ overflowY: "auto" }}>  
      {currentItems.map((item) => (
        <GridItem key={item.employee_id} selected={item.employee_id === selectedId} onClick={() => handleClick(item)}>
          <div>{item.first_name}</div>
          <div>{item.department}</div>
        </GridItem>
      ))}
      </div>
      <div style={{ flex:1,textAlign: "center" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {Math.ceil(sampleData.length / itemsPerPage)}
        </span>
        <button
          onClick={() =>
            setPage((prev) =>
              Math.min(prev + 1, Math.ceil(sampleData.length / itemsPerPage))
            )
          }
        >
          Next
        </button>
      </div>
    </GridContainer>
  );
}

export default GridView;