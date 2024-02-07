import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ValidationPipe,
  Delete,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { util } from 'prettier';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  @Get()
  async getJson(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.appService.getJson(
      query.applicationName,
      query.version,
      query.processFlow,
      query.tenant,
      query.appGroup,
      query.app,
    );
  }

  @Get('applicationName')
  async getApplicationName(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.appService.getApplicationList(
      query.tenant,
      query.appGroup,
      query.app,
    );
  }

  @Post()
  async saveJson(
    @Body() req: any,
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return await this.appService.saveaWorkFlow(
      req,
      query.type,
      query.version,
      query.tenant,
      query.appGroup,
      query.app,
    );
  }

  @Get('/sync')
  async syncToFolder(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ) {
    return this.appService.syncToFolder(query.tenant);
  }

  @Delete('/deleteApplication')
  async deleteApplication(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return this.appService.deleteApplication(
      query.applicationName,
      query.tenant,
      query.appGroup,
      query.app,
    );
  }

  @Get('applicationDetails')
  async applicationDetails() {
    return this.appService.applicationDetails();
  }

  @Get('/tenantDetails')
  async tenantDetails() {
    return this.appService.tenantDetails();
  }


  @Get('/controlpolicy')
  async controlpolicy(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return this.appService.controlpolicy(query.nodeType);
  }

  



  @Get('/userRole')
  async userRole(
    @Query(new ValidationPipe({ transform: true })) query: any,
  ): Promise<any> {
    return this.appService.getUserRoleDetails(query.roleId);
  }

  // @Get('/redis')
  // async redisCheck(): Promise<any> {
  //   return await this.cacheManager.set('torus', {
  //     tenant: {
  //       application1: {
  //         pfflow: {
  //           v1: {
  //             data: '100',
  //           },
  //           v2: {
  //             data: '200',
  //           },
  //         },
  //       },
  //       application2: {
  //         pfflow: {
  //           v1: {
  //             data: '100',
  //           },
  //           v2: {
  //             data: '200',
  //           },
  //         },
  //       },
  //     },
  //   });
  //   // await this.cacheManager.get('sname')
  // }

  // @Get('/getredis')
  // async getredis(
  //   @Query(new ValidationPipe({ transform: true })) query: any,
  // ): Promise<any> {
  //   return await this.cacheManager.get(query.tenant);
  // }

  // @Get('/delredis')
  // async delredis(): Promise<any> {
  //   return await this.cacheManager.del('torus');
  // }
}
