import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RegisterLeadDto } from './dto';
import { apiWrapper } from 'src/common/globalErrorHandlerClass';


@Controller('auth')
@Controller('student')
export class StudentController {
    constructor(private StudentService: StudentService) {}


      @Get('/course/:id')
      @HttpCode(200)
     getCourse(@Param('id') id: string, @Query() query?: Record<string, string>) {
  return apiWrapper(() =>
    this.StudentService.getCourse({
      id,
      filters: query, // Passing all query parameters dynamically
    })
  )}
      @Public()
      @Get('/courses')
      @HttpCode(200)
     getCourses(@Query() query?: Record<string, string>) {
  return apiWrapper(() =>
    this.StudentService.getCourses({
      filters: query, // Passing all query parameters dynamically
    })
  )}
      @Public()
      @Post('/courses')
      @HttpCode(200)
     createCourse(@Query() query?: Record<string, string>) {
  return apiWrapper(() =>
    this.StudentService.createCourse({
      filters: query, // Passing all query parameters dynamically
    })
  )}

      @Public()
      @Post('/registerLead')
      @HttpCode(200)
    //   @ApiCustomResponse('signUp')
    registerLead(
        @Body() dto: RegisterLeadDto,
      ): Promise<{ user?: any; message?: string; status: number }> {
        return apiWrapper(() => this.StudentService.registerLead(dto));
      }

      @Post('/register')
      @HttpCode(200)
      registerStudent(
        @Body() dto: RegisterLeadDto,
      ): Promise<{ user?: any; message?: string; status: number }> {
        return apiWrapper(() => this.StudentService.registerStudent(dto));
      }
      
}
