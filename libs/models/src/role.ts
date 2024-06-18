import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission";

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @ManyToMany(()=>Permission)
    @JoinTable({name: 'role_permission'})
    permission: Permission[]
}