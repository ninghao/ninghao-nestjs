import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle()
      .pipe(
        map(
          data => {
            const [entities, total] = data;
            request.res.header('X-Total-Count', total);
            return entities;
          }
        )
      );
  }
}
