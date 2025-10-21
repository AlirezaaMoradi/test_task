// Imports
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable, map } from "rxjs";

// Interceptor
@Injectable()
export class DataResponse implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService
  ){}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return(next.handle().pipe(
      map((data) => ({
        api_version: this.configService.get('appConfig.api_version'),
        data: data
      }))
    ));
  }
}