import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Post} from "./Post";
import {User} from "./User";

@Entity()
export class Like {
    @PrimaryColumn()
    postId: string;

    @PrimaryColumn()
    userId: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(
        () => Post,
        (post) => post.userLike
    )
    @JoinColumn({name: 'postId'})
    post: Promise<Post>

    @ManyToOne(
        () => User,
        (user) => user.postLiked
    )
    @JoinColumn({name: 'userId'})
    user: Promise<User>

}
