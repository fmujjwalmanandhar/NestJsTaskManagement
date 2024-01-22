import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne } from 'typeorm';
import { Users } from '../auth/users.entity';

@Entity()
export class AppVersionInfo {
  @Column({ default: '5.1.0' })
  appversion: string;

  @Column({ default: false })
  isForceUpdate: boolean;

  @OneToOne((_type) => Users, (user) => user.appversioninfo, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: Users;
}
