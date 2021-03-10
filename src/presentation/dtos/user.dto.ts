import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  id?: number;
  @ApiProperty({ nullable: false, example: 'test user' })
  name: string;
  @ApiProperty({ nullable: false, example: 'testuser@gmail.com' })
  email: string;
  @ApiProperty({ nullable: false, example: 'testuserpasswd' })
  password: string;
  @ApiProperty({ nullable: true, example: '2020-09-01T14:27:21.000Z' })
  created_on?: Date;
  @ApiProperty({ nullable: true, example: '2020-09-01T14:27:21.000Z' })
  updated_on?: Date;
  @ApiProperty({ nullable: true, example: true })
  activated?: boolean;
}

export class UserAuthDto {
  @ApiProperty({ nullable: false, example: 'testuser@gmail.com' })
  email: string;

  @ApiProperty({ nullable: false, example: 'testuserpasswd' })
  password: string;
}
