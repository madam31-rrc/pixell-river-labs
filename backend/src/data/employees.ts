import type { Department } from '../types/Employee';

export const departments: Department[] = [
  {
    name: "Engineering",
    employees: [
      { firstName: "Priyanka", lastName: "Bose" },
      { firstName: "Madeleine", lastName: "Madden" },
      { firstName: "Taylor", lastName: "Napier" }
    ]
  },
  {
    name: "IT Technicians",
    employees: [
      { firstName: "Iniko", lastName: "Stonebear" },
      { firstName: "Tala", lastName: "Braveheart" }
    ]
  },
  {
    name: "Human Resources",
    employees: [
      { firstName: "Jesse", lastName: "Azure" },
      { firstName: "Stacy", lastName: "Silver" }
    ]
  }
];