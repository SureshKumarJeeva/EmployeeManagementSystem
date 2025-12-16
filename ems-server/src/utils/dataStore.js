import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src/data/employees.json");

let employees = [];

/* Load once at startup */
export function loadEmployees() {
  if (!employees.length) {
    const fileData = fs.readFileSync(dataFilePath, "utf-8");
    employees = JSON.parse(fileData);
  }
  return employees;
}

/* Queries */
export function getEmployees({ page, limit, sortBy, sortOrder }) {
  let data = [...loadEmployees()];
  console.log("Loaded employees:", data.length);
  if (sortBy) {
    data.sort((a, b) =>
      sortOrder === "DESC"
        ? b[sortBy] > a[sortBy] ? 1 : -1
        : a[sortBy] > b[sortBy] ? 1 : -1
    );
  }

  const start = (page - 1) * limit;
  console.log(`Paginating: page ${page}, limit ${limit}, start ${start}`);
  return data.slice(start, start + limit);
}

export function getEmployeeById(id) {
  return loadEmployees().find(emp => parseInt(emp.employee_id) === parseInt(id));
}

/* Mutations */
export function readEmployees() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

export function writeEmployees(employees) {
  fs.writeFileSync(dataFilePath, JSON.stringify(employees, null, 2));
}

export function addEmployee(input) {
  const employees = readEmployees();

  const newEmployee = {
    id: Date.now().toString(),
    ...input,
  };

  employees.push(newEmployee);
  writeEmployees(employees);

  return newEmployee;
}

export function updateEmployee(id, input) {
  const employees = readEmployees();

  const index = employees.findIndex((e) => parseInt(e.employee_id) === parseInt(id));
  if (index === -1) {
    throw new Error("Employee not found");
  }

  employees[index] = {
    ...employees[index],
    ...input,
  };

  writeEmployees(employees);
  return employees[index];
}