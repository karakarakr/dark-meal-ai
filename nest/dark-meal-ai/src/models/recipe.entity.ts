import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Ingredient } from '../recipes/entities/recipe.entity'
import { User } from "./user.entity";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column({ type: 'jsonb', nullable: true })
    ingredients: Ingredient[]

    @ManyToOne(() => User, (user) => user.recipes, { eager: false })
    @JoinColumn({ name: 'authorId' })
    author: User

    @Column()
    authorId: number

    @Column({ type: 'timestamp' })
    createdAt: Date
}