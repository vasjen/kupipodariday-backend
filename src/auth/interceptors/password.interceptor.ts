import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.removePasswordField(data)));
  }

  private removePasswordField(data: unknown): unknown {
    {
      if (data instanceof Object) {
        if (Array.isArray(data)) {
          return data.map((item) => this.removePasswordField(item));
        }
        for (const key in data) {
          if (key === 'password' || key === 'email') {
            delete data[key];
          } else if (data[key] instanceof Object) {
            data[key] = this.removePasswordField(data[key]);
          }
        }
      }
      return data;
    }
  }
}