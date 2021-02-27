// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import { Scope } from './model.actions';

declare global{
  namespace Express {
    interface Request {
      scopes?: Scope;
      action?: string;
    }
  }
}
