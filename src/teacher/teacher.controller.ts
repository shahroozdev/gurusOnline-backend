import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { apiWrapper } from 'src/common/globalErrorHandlerClass';
import { TeacherService } from './teacher.service';
import { AdminAddTeacherDto } from './dto';
import { ApiCustomResponse } from 'src/common/decorators/api-decorator';

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
  @ApiCustomResponse('registerTeacher')
  registerTeacher(
    @Body() dto: AdminAddTeacherDto,
  ): Promise<{ user?: any; message?: string; status: number }> {
    return apiWrapper(() => this.TeacherService.registerTeacher(dto));
  }
  @Get()
  @HttpCode(200)
  allTeachers(@Query() query?: Record<string, string>): Promise<{ teachers?: any; message?: string; status: number }> {
    return apiWrapper(() => this.TeacherService.allTeachers(query));
  }
  @Get('/:id')
  @HttpCode(200)
  teacherById(
    @Param('id') id: string,
  ): Promise<{ teacher?: any; message?: string; status: number }> {
    return apiWrapper(() => this.TeacherService.teacherById(Number(id)));
  }

  @Delete('/:id')
  @HttpCode(200)
  deleteTeacherById(
    @Param('id') id: string,
  ): Promise<{ message?: string; status: number }> {
    return apiWrapper(() => this.TeacherService.deleteTeacherById(Number(id)));
  }
}
