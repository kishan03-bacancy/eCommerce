import { APIResponse } from '../../../shared/services/api.service';

export declare namespace auth {
  export namespace login {
    interface Request {
      email: string;
      password: string;
    }

    interface Response extends APIResponse {
      data: LoginData;
    }

    interface LoginData {
      token: string;
      user: any;
    }
  }

  export namespace register {
    interface Request {
      email: string;
      password: string;
      phone: string;
      name: string;
    }

    interface Response extends APIResponse {
      data: RegisterData;
    }

    interface RegisterData {
      token: string;
      user: any;
    }
  }
}
