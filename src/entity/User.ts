import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Entity, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, ObjectType } from 'type-graphql';

// Set up both our typedefs and database schema

@ObjectType() // makes this entity a object type in grapql
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field() // field = graphql schema
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column() // column = database column
  password: string;

  @Field({ description: "To validate user input of password"})
  confirmPassword: string;
}

