import { BACKEND_URL } from "../../config/constants";

function parseDateToTimezone(isoString: string, offset: number): string {
  const date = new Date(isoString);

  // Obter os componentes de data no UTC
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth() + 1; // O mês é baseado em 0, então adicionamos 1
  const utcDay = date.getUTCDate();
  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();
  const utcSeconds = date.getUTCSeconds();

  // Calcular a nova hora considerando o offset
  const offsetHours = utcHours + offset;

  // Criar uma nova data com os componentes ajustados
  const adjustedDate = new Date(
    Date.UTC(utcYear, utcMonth - 1, utcDay, offsetHours, utcMinutes, utcSeconds)
  );

  // Formatar a data no formato "YYYY-MM-DD"
  const year = adjustedDate.getUTCFullYear();
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(adjustedDate.getUTCDate()).padStart(2, "0");

  // Formatar o tempo no formato "HH:MM:SS"
  const hours = String(adjustedDate.getUTCHours()).padStart(2, "0");
  const minutes = String(adjustedDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(adjustedDate.getUTCSeconds()).padStart(2, "0");

  // Concatenar data e tempo
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  console.log(formattedDate);
  return formattedDate;
}

export interface Data {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export function createData(
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  createdAt: string
): Data {
  return {
    id,
    firstName,
    email,
    lastName,
    createdAt: parseDateToTimezone(createdAt, -6),
  };
}

export default class TableUtils {
  usersList: Array<Data | any> = [];

  constructor() {}

  async fetchData(): Promise<any> {
    const response = await fetch(`${BACKEND_URL}/users/list `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    const data = await response.json();
    if (response.status < 400) {
        localStorage.getItem("jwtToken");
      this.usersList = data as Array<any>;
      this.usersList = this.usersList.map((user: any) =>
        createData(
          user.id,
          user.email,
          user.firstName,
          user.lastName,
          user.createdAt
        )
      );
      return this.usersList;
    }
    return data;
  }

  async deleteUsers(ids: number[]): Promise<Boolean> {
    console.log(ids)
    const response = await fetch(`${BACKEND_URL}/users/delete-many`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
      body: JSON.stringify(
        ids,
      ),
    });

    return response.status < 400;
  }
}
