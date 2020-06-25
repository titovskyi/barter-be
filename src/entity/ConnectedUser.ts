import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class ConnectedUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn()
    userId: string;

    @PrimaryColumn()
    postId: string;

    @ManyToOne(() => Post, (post) => post.userConnection)
    @JoinColumn({ name: 'postId' })
    post: Promise<Post>;

    @ManyToOne(() => User, (user) => user.postConnection)
    @JoinColumn({ name: 'userId' })
    user: Promise<User>;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
