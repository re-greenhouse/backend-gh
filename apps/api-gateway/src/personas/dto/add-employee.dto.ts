import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AddEmployeeDto {
  @IsNotEmpty()
  @IsString()
  employeeProfileId: string;

  @IsBoolean()
  isAdmin: boolean;
}
