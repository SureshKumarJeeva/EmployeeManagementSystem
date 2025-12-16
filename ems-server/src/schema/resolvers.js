import {
  getEmployees,
  getEmployeeById,
  updateEmployee,
  addEmployee
} from "../utils/dataStore.js";
import bcrypt from "bcrypt";
import { users } from "../utils/users.js";
import { generateToken } from "../auth/auth.js";

import { ROLES } from "../auth/roles.js";

export const resolvers = {
  Query: {
    me: (_, __, { user }) => user || null,

    employees: (_, args, context) => {
      if (!context.user) throw new Error("Unauthorized");
      console.log("employees query 1");
      const employees = getEmployees(args);
      console.log("employees query 2", employees.length);
      return employees;
    },

    employee: (_, { id }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      return getEmployeeById(id);
    }
  },

  Mutation: {
    login: async (_, { username, password }) => {
      const user = users.find(u => u.username === username);
      if (!user) {
        throw new Error("Invalid username or password");
      }

      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (!isValid) {
        throw new Error("Invalid username or password");
      }

      const token = generateToken(user);

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      };
    },

    addEmployee: (_, { input }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      if (context.user.role !== ROLES.ADMIN) {
        throw new Error("Forbidden: Admin only");
      }

      return addEmployee(input);
    },
    
    updateEmployee: (_, { id, input }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      if (context.user.role !== ROLES.ADMIN) {
        throw new Error("Forbidden: Admin only");
      }

      return updateEmployee(id, input);
    }
  }
};