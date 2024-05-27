import { BACKEND_URL } from "../../config/constants";

export type StructuredData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  [key: string]: string; // index signature
};

export default class RegisterUserViewModel {
    constructor() {}

    async createUser(email: String, password: String, firstName: String, lastName: String): Promise<any> {
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName
        }),
      });
  
      return await response.json();
    }
  
    
    public get mainText() : string {
        return 'Cadastrar Usuário';
    }
    
    public get buttonText() : string {
        return 'Cadastrar';
    }
}