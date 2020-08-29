import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { Post } from './Post';

@Entity()
export class PostToPost {
    @PrimaryColumn()
    postId: string;

    @Column()
    postUser: string;

    @PrimaryColumn()
    suggestionId: string;

    @Column()
    suggestionUser: string;

    @Column()
    postConfirm: boolean;

    @Column()
    suggestionConfirm: boolean;

    @ManyToOne(() => Post, (post) => post.postConnection)
    @JoinColumn({ name: 'postId' })
    post: Promise<Post>;

    @ManyToOne(() => Post, (suggestion) => suggestion.suggestionConnection)
    @JoinColumn({ name: 'suggestionId' })
    suggestion: Promise<Post>;
}
