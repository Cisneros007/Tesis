export interface Roles{
admin?:boolean
cliente?:boolean
empleado?:boolean
}

export interface User {
  id: string;
  email: string;
  userName: string;
  roles : Roles;
}
