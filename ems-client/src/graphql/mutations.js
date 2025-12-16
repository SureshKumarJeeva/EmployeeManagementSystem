import { gql } from "@apollo/client";

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      employee_id
      first_name
      last_name
      date_of_birth
      email
      phone_number
      department
      salary
      hire_date
    }
  }
`;