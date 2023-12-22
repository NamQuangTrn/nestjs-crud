import { IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
  // @IsNotEmpty({ message: 'email khong duoc de trong' })
  // email: string;

  // @IsNotEmpty({ message: 'userId khong duoc de trong' })
  // userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'url khong duoc de trong' })
  url: string;

  // @IsNotEmpty({ message: 'status khong duoc de trong' })
  // status: string;

  @IsNotEmpty({ message: 'companyId khong duoc de trong' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'jobID khong duoc de trong' })
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({ message: 'url khong duoc de trong' })
  url: string;

  @IsNotEmpty({ message: 'companyId khong duoc de trong' })
  @IsMongoId({ message: 'companyId is mongo id' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'jobID khong duoc de trong' })
  @IsMongoId({ message: 'jobId is mongo id' })
  jobId: mongoose.Schema.Types.ObjectId;
}
