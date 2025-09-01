import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Ingredient, Difficulty } from '../recipes/entities/recipe.entity'
import type { CookingTime } from "../recipes/entities/recipe.entity";
import { User } from "./user.entity";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column({ nullable: true })
    imageURL: string

    @Column({ type: 'jsonb', nullable: true })
    ingredients: Ingredient[]

    @Column({ type: 'enum', enum: Difficulty })
    difficulty: Difficulty

    @Column({ type: 'json', nullable: true })
    cookingTime: CookingTime

    @ManyToOne(() => User, (user) => user.recipes, { eager: false })
    @JoinColumn({ name: 'authorId' })
    author: User

    @Column()
    authorId: number

    @Column({ type: 'timestamp' })
    createdAt: Date
}