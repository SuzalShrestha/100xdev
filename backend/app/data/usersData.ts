import { Gender } from "../enums/gender";

type User = {
  username: string;
  fullName: string;
  phone: string;
  gender: Gender;
  email: string;
  password: string;
  dob: string;
  address: string;
};

export const initialUsers: User[] = [
  {
    username: "shristi",
    fullName: "Shristi Shrestha",
    phone: "9810456631",
    gender: Gender.FEMALE,
    email: "shristi@gmail.com",
    password: "12345678",
    dob: "2055-06-01",
    address: "Kathmandu",
  },
  {
    username: "ram",
    fullName: "Ram Shrestha",
    phone: "9800000000",
    gender: Gender.MALE,
    email: "ram@gmail.com",
    password: "12345678",
    dob: "2035-08-25",
    address: "Kathmandu",
  },
  {
    username: "sita",
    fullName: "Sita Shrestha",
    phone: "9810000000",
    gender: Gender.FEMALE,
    email: "sita@gmail.com",
    password: "12345678",
    dob: "2035-08-25",
    address: "Kathmandu",
  },
  {
    username: "hari",
    fullName: "Hari Shrestha",
    phone: "9810200000",
    gender: Gender.MALE,
    email: "hari@gmail.com",
    password: "12345678",
    dob: "2053-07-04",
    address: "Pokhara",
  },
  {
    username: "bhuwan",
    fullName: "Bhuwan Acharya",
    phone: "9810203000",
    gender: Gender.MALE,
    email: "bhuwan@gmail.com",
    password: "12345678",
    dob: "2061-05-10",
    address: "Pokhara",
  },
  {
    username: "mukunda",
    fullName: "Mukunda Parajuli",
    phone: "9810555567",
    gender: Gender.MALE,
    email: "mukunda@gmail.com",
    password: "12345678",
    dob: "2058-03-15",
    address: "Lalitpur",
  },
  {
    username: "yojana",
    fullName: "Yojana Ghimire",
    phone: "9810987612",
    gender: Gender.FEMALE,
    email: "yojana@gmail.com",
    password: "12345678",
    dob: "2057-07-21",
    address: "Bhaktapur",
  },
];
