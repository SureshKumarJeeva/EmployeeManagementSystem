import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees(
    $page: Int
    $limit: Int
    $sortBy: String
    $sortOrder: String
  ) {
    employees(
      page: $page
      limit: $limit
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      employee_id
      first_name
      department
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      employee_id
      first_name
      last_name
      date_of_birth
      email
      phone_number
      department
      salary
      hire_date
      manager_id
    }
  }
`;