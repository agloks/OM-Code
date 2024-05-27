import { BACKEND_URL } from "../../config/constants";

export type StructuredData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    [key: string]: string; // index signature
  };

export default class SignUpViewModel {
    constructor() {}

    async signUp(email: String, password: String, firstName: String, lastName: String): Promise<any> {
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
        const data = await response.json();

        if (response.status < 400) {
          localStorage.setItem("jwtToken", data["jwt_token"]);
        }
        return data;
      }
    
    public get mainText() : string {
        return 'Cadastrar-se';
    }
    
    public get buttonText() : string {
        return 'Enviar';
    }
    
    public get linkSignInText() : string {
        return 'Já tem uma conta? Faça login';
    }
    
}