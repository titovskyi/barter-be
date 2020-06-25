import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Post } from './Post';
import { ConnectedUser } from './ConnectedUser';
import {Like} from "./Like";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsNotEmpty()
    phone: string;

    @Column({ nullable: true })
    authToken: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    about: string;

    @Column({ nullable: true })
    confirmCode: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Post, (post) => post.user, { cascade: true })
    posts: Post[];

    @OneToMany(() => Like, (like) => like.user)
    postLiked: Post[];

    @OneToMany(() => ConnectedUser, (connectedUser) => connectedUser.userId)
    postConnection: Promise<ConnectedUser>;
}
