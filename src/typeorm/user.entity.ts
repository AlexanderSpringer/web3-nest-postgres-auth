import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    name: 'eth_addr',
    nullable: false,
    default: '',
  })
  ethAddr: string;

  @Column({
    nullable: true,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: true,
    default: '',
  })
  email: string;

  @Column({
    nullable: true,
    default: '',
    select: false,
  })
  password: string;

  @Column({
    nullable: true,
    default: 0,
  })
  nonce: number;
}