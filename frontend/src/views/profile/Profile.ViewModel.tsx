import { BACKEND_URL } from "../../config/constants";

export default class ProfileViewModel {
    constructor() {}

    async update(id: number, email?: String, password?: String, firstName?: String, lastName?: String): Promise<Boolean | any> {
        const response = await fetch(`${BACKEND_URL}/users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify({
            id,
            email,
            password,
            firstName,
            lastName
          }),
        });
        
        const data = await response.json();
        return data;
      }
    
    public get mainText() : string {
        return 'Atualizar Usuário';
    }
    
    public get buttonText() : string {
        return 'Atualizar';
    }
}