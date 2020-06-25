import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';
import { User } from './User';
import { ConnectedUser } from './ConnectedUser';
import {Like} from "./Like";

@Entity()
@Unique(['id'])
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    photo: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(() => Like, (like) => like.post)
    userLike: User;

    @OneToMany(() => ConnectedUser, (connectedUser) => connectedUser.postId)
    userConnection: Promise<ConnectedUser>;
}
