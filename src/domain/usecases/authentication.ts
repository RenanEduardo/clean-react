import { AccountModel } from '../models/account-model'

type AuthenticatinParams = {
  email: string
  password: string
}
export interface Authentication {
  auth: (params: AuthenticatinParams) => Promise<AccountModel>
}
