import { ApiProperty } from '@nestjs/swagger';
export class DebtDto {
  id: number;
  @ApiProperty({ type: "int", nullable: true })
  user_id: number;
  @ApiProperty({ nullable: false, example: 'test user' })
  user_name: string;
  @ApiProperty({ nullable: false, example: 'test user' })
  motivation_debt: string;
  @ApiProperty({ nullable: false, example: 'testuser@gmail.com' })
  value: string;
  @ApiProperty({ nullable: false, example: 'testuserpasswd' })
  date_debt: Date;
  @ApiProperty({ nullable: true, example: '2020-09-01T14:27:21.000Z' })
  created_on?: Date;
  @ApiProperty({ nullable: true, example: '2020-09-01T14:27:21.000Z' })
  updated_on?: Date;
}
