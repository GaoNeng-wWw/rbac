import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role';
import { randomBytes, pbkdf2Sync } from 'node:crypto';

export const encry = (value: string, salt: string) => pbkdf2Sync(value, salt, 1000, 18, 'sha256').toString('hex');

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_role' })
  role: Role[];
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;
  @Column({ nullable: true })
  salt: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
  @Column({ type: 'bigint', nullable: true })
  deleteAt: number;
  @BeforeInsert()
  beforeInsert() {
    this.salt = randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);
  }
}
