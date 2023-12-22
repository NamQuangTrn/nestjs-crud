import { IsNotEmpty } from 'class-validator';
export class CreateCompanyDto {
  @IsNotEmpty({ message: `name can't be empty` })
  name: string;

  @IsNotEmpty({ message: `address can't be empty` })
  address: string;

  @IsNotEmpty({ message: `description can't be empty` })
  description: string;

  @IsNotEmpty({ message: `logo can't be empty` })
  logo: string;
}
