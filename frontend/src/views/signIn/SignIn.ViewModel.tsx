import { BACKEND_URL } from "../../config/constants";

export default class SignInViewModel {
  constructor() {}

  async signIn(email: String, password: String): Promise<any> {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();

    if (response.status < 400) {
      localStorage.setItem("jwtToken", data["jwt_token"]);
    }
    return data;
  }

  public get mainText(): string {
    return "Login";
  }

  public get buttonText(): string {
    return "Entrar";
  }

  public get linkSignUpText(): string {
    return "Não tem uma conta? Faça o cadastro";
  }
}
