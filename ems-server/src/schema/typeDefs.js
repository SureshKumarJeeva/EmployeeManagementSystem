import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Employee {
    employee_id: Int!
    first_name: String
    last_name: String
    date_of_birth: String
    email: String
    phone_number: String
    department: String
    salary: Float
    hire_date: String
    manager_id: Int
  }

  input UpdateEmployeeInput {
    first_name: String
    last_name: String
    date_of_birth: String
    email: String
    phone_number: String
    department: String
    salary: Float
    hire_date: String
    manager_id: Int
  }

  input AddEmployeeInput {
    first_name: String!
    last_name: String
    date_of_birth: String
    email: String
    phone_number: String
    department: String
    salary: Float
    hire_date: String
    manager_id: Int
  }

  type Query {
    employees(
      page: Int = 1
      limit: Int = 10
      sortBy: String
      sortOrder: String = "ASC"
    ): [Employee]

    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(input: AddEmployeeInput!): Employee
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee
    login(username: String!, password: String!): AuthPayload!
  }
`;