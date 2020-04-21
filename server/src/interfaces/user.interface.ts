interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  password: string;
  role: string;
  address?: {
    street: string;
    city: string;
  };
}

export default User;
