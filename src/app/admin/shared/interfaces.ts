export interface User {
  email: string
  password: string
  returnSecureToken: boolean
}

export interface FbAuthResponse {
  idToken: string
  expiresIn: string
  displayName: string
  email :string
  kind: string
  localId: string
  refreshToken: string
  registered: boolean
}
