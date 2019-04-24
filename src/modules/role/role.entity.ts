import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from 'src/core/enums/user-role.enum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: UserRole })
  name: UserRole;

  @Column()
  alias: string;
}