import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Task } from '../tasks/task.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: '5.1.0' })
  appversioninfo: string;

  /***Relation between Users and Task */
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
