import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./Review";

@Entity()
class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  // Relacionamento com Review (Um User tem muitas Reviews)
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}

export { User };
