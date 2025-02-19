import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

// Entities
import { User } from "./user.ts";

@Entity()
export class Dish {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("text")
  description: string;

  @Column("decimal")
  price: number;

  @Column()
  image: string;

  @Column()
  category: string;

  @Column({ type: "boolean", default: true, nullable: true })
  isActive: boolean | null;

  @Column({ type: "varchar", length: 255, default: "meat", nullable: true })
  additionalItem: string | null;

  @ManyToOne(() => User, (user) => user.dish, { nullable: false })
  user: User;
}
