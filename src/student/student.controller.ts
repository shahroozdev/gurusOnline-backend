import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import { StudentService } from './student.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RegisterLeadDto } from './dto';
import { apiWrapper } from 'src/common/globalErrorHandlerClass';


@Controller('auth')
@Controller('student')
export class StudentController {
    constructor(private StudentService: StudentService) {}

      @Public()
      @Get('/courses/:id?')
      @HttpCode(200)
     getCourses(@Param('id') id?: string, @Query() query?: Record<string, string>) {
  return apiWrapper(() =>
    this.StudentService.getCourses({
      id,
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
}
