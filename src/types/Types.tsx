import { Timestamp } from "firebase/firestore";

export interface IBMIData {
  id: string;
  email: string;
  age: number;
  bmiCategory: string;
  bmiResult: number;
  createdAt: {
    nanoseconds: number;
    seconds: number;
  };
  gender: string;
  height: number;
  weight: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserData {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth: Timestamp;
  bmiReminder: boolean;
  createdAt: Timestamp;
  membership: string;
  totalLogInTime: number;
  lastLoginTime: Timestamp;
  address: string;
  medicalConditions: string;
}

export interface IMedicalData {
  id: string;
  email: string;
  currentMedications: string;
  medicalConditions: string;
  createdAt: Timestamp;
}

export interface IAllergies {
  id: string;
  email: string;
  allergies: string[];
}

export interface IMonthlyMembership {
  id: string;
  email: string;
  date: string;
  amount: number;
}

export interface IWorkProgress {
  id: string;
  email: string;
  date: string;
  nameOfWork: string;
  levelWorkout: string;
  bmiResult: number;
  bmiCategory: string;
}

export interface IFood {
  _id: string;
  name: string;
  image: string;
  calories: string;
  description: string;
  ingredietns: string[];
  mealType: string;
  allergies: string[];
  bmiRange: {
    min: number;
    max: number;
    id: string;
  };
  createdAt: string;
}

export interface IFoodStatus {
  id: string;
  foodId: string;
  dateAndTime: string;
  nameOfFood: string;
  done: boolean;
}
