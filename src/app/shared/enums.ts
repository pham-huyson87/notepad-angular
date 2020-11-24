export enum UserAnswer {
  Unknown = 0,
  Ok = 1,
  Cancel = 2,
  GotIt = 3,
  Close = 4,
  Add = 5,
  Update = 6,
  Remove = 7,
  Create = 8,
  Read = 9,
  Delete = 10
}

export enum ViewAction {
  Unknown = 0,
  Refresh = 1
}

export enum ErrorType {
  Unknown = 0,
  ServerSideFail = 1,
  RequestIntegrity = 2,

  AccountExists = 3,
  AccountDoesNotExists = 4,
  WrongVerificationCode = 5
}
