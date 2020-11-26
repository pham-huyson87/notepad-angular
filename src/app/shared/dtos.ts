import { ErrorType } from 'src/app/shared/enums';


export class Error {
  public type: ErrorType;
  public extra: any;
}

export class BaseResult {
  public isSuccess: boolean = false;
  public errors: Error[] = [];
}





export class AddCarRequest {
  constructor(
    private name: string,
    private model: string
  ) {}
}

export class AddCarResponse extends BaseResult {

}
