import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import {
  ResponseMessage,
  SkipCheckPermission,
  User,
} from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  @ResponseMessage('create a subscriber')
  create(
    @Body() createSubscriberDto: CreateSubscriberDto,
    @User() user: IUser,
  ) {
    return this.subscribersService.create(createSubscriberDto, user);
  }

  @Get()
  @ResponseMessage('fetch sub by paginate')
  findAll(
    @Query('currentPage') current: number,
    @Query('pageSize') limit: number,
    @Query() qs: string,
  ) {
    return this.subscribersService.findAll(+current, +limit, qs);
  }

  @Get(':id')
  @ResponseMessage('fetch sub by id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findOne(id);
  }

  @Patch()
  @SkipCheckPermission()
  @ResponseMessage('update subs')
  update(
    @Param('id') id: string,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
    @User() user: IUser,
  ) {
    return this.subscribersService.update(updateSubscriberDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.subscribersService.remove(id, user);
  }

  @Post('skills')
  @ResponseMessage('update subs')
  @SkipCheckPermission()
  getUserSkills(@User() user: IUser) {
    return this.subscribersService.getSkills(user);
  }
}
