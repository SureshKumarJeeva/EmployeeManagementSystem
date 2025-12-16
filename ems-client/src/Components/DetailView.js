import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_EMPLOYEE } from "../graphql/employeeQueries";
import styled from "styled-components";
import { useMutation } from "@apollo/client/react";
import { UPDATE_EMPLOYEE } from "../graphql/mutations";

const DetailContainer = styled.div`
  background-color: #ffffff;
  color: black;
  padding: 20px;
  height: 100%;
  font-size: 12px;
  overflow-y: auto;
`;

const EmployeeTitleContainer = styled.div`
  color: black;
  font-size: 14px;
  display: flex;
  align-items: center;
  flex: 1;
  gap: 10px;
`;

const EditIcon = styled.span`
  cursor: pointer;
  font-size: 14px;
`;

function DetailView({ item }) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(null);

   const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

   const { data, loading } = useQuery(GET_EMPLOYEE, {
    skip: !item,
    variables: { id: item?.employee_id },
  });

  useEffect(() => {
    setFormData(data?.employee);
    setEditMode(false);
  }, [data]);

  if (!item) return <DetailContainer>Select an employee</DetailContainer>;
  if (loading || !formData) return <DetailContainer>Loading details...</DetailContainer>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = async () => {
    await updateEmployee({
      variables: {
        id: item.employee_id,
        input: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          date_of_birth: formData.date_of_birth,
          email: formData.email,
          phone_number: formData.phone_number,
          department: formData.department,
          salary: Number(formData.salary),
          hire_date: formData.hire_date,
        },
      },
    });
    setEditMode(false);
  };
  return (
    <DetailContainer>
      <h3 style={{ fontSize: "14px" }}>
        {editMode ? (
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        ) : (
          <>
            {formData.first_name}
            <EditIcon onClick={() => setEditMode(!editMode)}>
            ✏️
            </EditIcon>
          </>
        )}
      </h3>
      <p>
        Date of Birth:{" "}
        {editMode ? (
          <input
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        ) : (
          formData.date_of_birth
        )}
      </p>

      <p>
        Email:{" "}
        {editMode ? (
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        ) : (
          formData.email
        )}
      </p>

      <p>
        Phone Number:{" "}
        {editMode ? (
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        ) : (
          formData.phone_number
        )}
      </p>

      <p>
        Department:{" "}
        {editMode ? (
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        ) : (
          formData.department
        )}
      </p>
      <p>
        Salary:{" "}
        {editMode ? (
          <input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        ) : (
          formData.salary
        )}
      </p>
      <p>
        Hire Date:{" "}
        {editMode ? (
          <input
            name="hire_date"
            value={formData.hire_date}
            onChange={handleChange}
          />
        ) : (
          formData.hire_date
        )}
      </p>

      {editMode && (
        <button onClick={handleSave}>Update</button>
      )}
      
    </DetailContainer>
  );
}

export default DetailView;