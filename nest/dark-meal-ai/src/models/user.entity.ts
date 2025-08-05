import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Recipe } from "./recipe.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({ type: 'timestamp' })
    createdAt: Date

    @OneToMany(() => Recipe, (recipe) => recipe.author)
    recipes: Recipe[]
}