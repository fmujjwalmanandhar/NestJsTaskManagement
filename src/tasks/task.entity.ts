import { Exclude } from 'class-transformer';
import { Users } from 'src/auth/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './tasks-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => Users, (user) => user.tasks, { eager: false })
  @Exclude({
    toPlainOnly: true,
  }) /**We'll be using class transformer to serialize user data, This will exclude user data */
  user: Users;
}
