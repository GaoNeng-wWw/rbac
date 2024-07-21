import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  order: number;
  @Column({ nullable: true })
  parentId: number | null;
  @Column()
  menuType: string;
  @Column({ nullable: true })
  icon: string | null;
  @Column()
  component: string;
  @Column()
  path: string;
}
