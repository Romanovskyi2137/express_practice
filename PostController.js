
const PostService = require("./PostService");

class PostController {
    async create (req, res) {
        try{
            const post = await PostService.create(req.body)
            res.status(200).json(post)
        } catch(e){
            res.status(500).json(e)
        }
    };
    async getAll (req, res) {
        try{
            const posts = await PostService.getAll();
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    };
    async getOne (req, res) {
        try{
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: "need ID"})
            };
            const post = await PostService.getOne(id);
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    };
    async update (req, res) {

        try{
            const post = req.body;
            if(!post._id) {
                res.status(400).json({message: "id is not defiened"})
            };
            const updatedPost = await PostService.update(post);
            return res.status(200).json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }

    };
    async delete (req, res) {
        try{
            if(!req.params.id) {
                res.status(400).json({message: "id is not defined"})
            };
            const post = await PostService.delete(req.params.id);
            return res.json(post)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
};


module.exports = new PostController