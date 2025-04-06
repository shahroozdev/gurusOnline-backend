import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { apiWrapper } from 'src/common/globalErrorHandlerClass';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {
    constructor(private TeacherService: TeacherService) {}
          @Public()
          @Post('/registerLead')
          @HttpCode(200)
        //   @ApiCustomResponse('signUp')
        registerLead(
            @Body() dto: any,
          ): Promise<{ user?: any; message?: string; status: number }> {
            return apiWrapper(() => this.TeacherService.registerLead(dto));
          }
    
          @Post('/register')
          @HttpCode(200)
          registerTeacher(
            @Body() dto: any,
          ): Promise<{ user?: any; message?: string; status: number }> {
            return apiWrapper(() => this.TeacherService.registerTeacher(dto));
          }
}
