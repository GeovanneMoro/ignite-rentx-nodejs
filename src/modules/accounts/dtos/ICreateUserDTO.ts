interface ICreateUserDTO {
  id?: string;
  name: string;
  // username: string;
  email: string;
  password: string;
  driver_license: string;
  avatar?: string;
}

export { ICreateUserDTO };
