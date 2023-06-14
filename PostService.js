const Post = require("./post");


class PostService {
    async create (post) {
            const createdPost = await Post.create(post)
            return createdPost
    };
    async getAll () {
            const posts = await Post.find();
            return posts
    };
    async getOne (id) {
            if (!id) {
                throw new Error("id is not defiened")
            };
            const post = await Post.findById(id);
            return post
    };
    async update (body) {
            const post = body;
            const id = body._id;
            if(!id) {
                throw new Error("id is not defiened")
            };
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true});
            return updatedPost
    };
    async delete (id) {
            if(!id) {
                throw new Error("id is not defiened")
            };
            const post = await Post.findByIdAndDelete(id);
            return post
    }
};

module.exports = new PostService()