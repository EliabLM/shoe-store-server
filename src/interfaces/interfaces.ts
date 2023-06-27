import { Local, Rol } from 'types';

export interface User {
  nombre: string;
  password: string;
  email: string;
  rol: Rol;
  local: Local;
  activo: boolean;
}

export interface IResponse {
  code: number;
  message: string;
  data: object | null | undefined;
}
