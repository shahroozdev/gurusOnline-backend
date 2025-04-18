import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Public } from 'src/common/decorators/public.decorator';
import { RegisterLeadDto } from './dto';
import { apiWrapper } from 'src/common/globalErrorHandlerClass';
import { ApiCustomResponse } from 'src/common/decorators/api-decorator';

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
      }),
    );
  }
  @Public()
  @Get('/courses')
  @HttpCode(200)
  getCourses(@Query() query?: Record<string, string>) {
    return apiWrapper(() =>
      this.StudentService.getCourses({
        filters: query, // Passing all query parameters dynamically
      }),
    );
  }
  @Public()
  @Post('/courses')
  @HttpCode(200)
  createCourse(@Query() query?: Record<string, string>) {
    return apiWrapper(() =>
      this.StudentService.createCourse({
        filters: query, // Passing all query parameters dynamically
      }),
    );
  }

  @Public()
  @Post('/registerLead')
  @HttpCode(200)
  @ApiCustomResponse('registerLead')
  registerLead(
    @Body() dto: RegisterLeadDto,
  ): Promise<{ user?: any; message?: string; status: number }> {
    return apiWrapper(() => this.StudentService.registerLead(dto));
  }

  @Get('/leads')
  @HttpCode(200)
  @ApiCustomResponse('allLeads')
  allLeads(): Promise<{ students?: any; message?: string; status: number }> {
    return apiWrapper(() => this.StudentService.allLeads());
  }
  @Get('/leads/:id')
  @HttpCode(200)
  @ApiCustomResponse('leadById')
  leadById(
    @Param('id') id: string,
  ): Promise<{ student?: any; message?: string; status: number }> {
    return apiWrapper(() => this.StudentService.leadById(Number(id)));
  }
  @Post('/register')
  @HttpCode(200)
  registerStudent(
    @Body() dto: RegisterLeadDto,
  ): Promise<{ user?: any; message?: string; status: number }> {
    return apiWrapper(() => this.StudentService.registerStudent(dto));
  }
  @Get()
  @HttpCode(200)
  allStudents(): Promise<{ students?: any; message?: string; status: number }> {
    return apiWrapper(() => this.StudentService.allStudents());
  }
  @Get('/students/:id')
  @HttpCode(200)
  studentById(
    @Param('id') id: string,
  ): Promise<{ student?: any; message?: string; status: number }> {
    return apiWrapper(() => this.StudentService.studentById(Number(id)));
  }
}
