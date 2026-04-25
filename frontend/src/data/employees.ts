import type { Department } from '../types/Employee';

export const departments: Department[] = [
  {
    name: "Engineering",
    employees: [
      { firstName: "Priyanka", lastName: "Bose" },
      { firstName: "Madeleine", lastName: "Madden" },
      { firstName: "Taylor", lastName: "Napier" },
      { firstName: "Alex", lastName: "Johnson" },
      { firstName: "Sam", lastName: "Williams" },
      { firstName: "Jordan", lastName: "Smith" } 
    ]
  },
  {
    name: "IT Technicians",
    employees: [
      { firstName: "Iniko", lastName: "Stonebear" },
      { firstName: "Tala", lastName: "Braveheart" },
      { firstName: "Kiona", lastName: "Redhawk" },
      { firstName: "Liam", lastName: "Brown" }
    ]
  },
  {
    name: "Human Resources",
    employees: [
      { firstName: "Jesse", lastName: "Azure" },
      { firstName: "Stacy", lastName: "Silver" },
      { firstName: "Morgan", lastName: "Gold" },
      { firstName: "Casey", lastName: "Copper" }
    ]
  }
];