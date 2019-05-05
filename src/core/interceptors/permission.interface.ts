import { UserRole } from "../enums/user-role.enum";
import { Possession } from "../enums/possession.enum";

export interface PermissionInterface {
  role: UserRole;
  resource: string;
  possession: Possession;
}