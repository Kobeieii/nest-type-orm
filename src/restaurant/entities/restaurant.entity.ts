import { Column, Entity } from 'typeorm';
import Model from 'src/model.entity';

@Entity()
export class Restaurant extends Model {
  @Column()
  name: string;

  @Column({ nullable: true })
  promotion: string;

  @Column()
  customers: number;

  @Column({ default: false })
  chiefStatus: boolean;

  @Column({ default: false })
  employerStatus: boolean;
}
