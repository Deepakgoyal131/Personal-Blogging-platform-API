const express = require('express');
const router = express.Router();

//Validate body
const { body, validationResult } = require('express-validator');

//Schema
const Blogs = require('../schemas/myblogs');

//Fetch all Blogs
router.get('/blogs', async (req, res) => {
    try {
        let blogs = await Blogs.find().select('-__v').sort({publishingDate: -1});
        return res.json(blogs)
    } catch (error) {
        res.status(400).send(error);
    }
});


//get blogs with date range
router.get('/bdr',async (req,res)=>{

    let startDate = new Date(req.body.startdate);
    let endDate = new Date(req.body.enddate);

    //You can also validate date here using javascript
     

    try {
        let blogs = await Blogs.find({ publishingDate: { $gte: startDate, $lte: endDate} }).sort({publishingDate: -1});

        return res.json(blogs);

    } catch (error) {
        res.status(400).send(error.message);
    }
})

// Get the Blog using tag name
router.get('/blog/:tag',async (req,res)=>{
    let tag = req.params.tag;

    try {
        let blog = await Blogs.findOne({tag : tag}).select('-_id -publishingDate -__v')
        if(!blog){  
            return res.status(404).json({msg: "This blog is not present"});
        }
    
        return res.json(blog)
        
    } catch (error) {
        res.status(500).send('Internal Server Error')
    }
  
})

//Create New Blog
router.post('/createblog', [body('tag', 'Tag should be greater than 3 charcter and less than 10 charcter').isLength({ min: 3, max: 10 }), body('artical', 'Artical must be greater than 30 charcter').isLength({ min: 30 })], async (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    try {

        let blog = await Blogs.create({
            tag: req.body.tag,
            artical: req.body.artical
        })
        let data = await blog.save();

        return res.json(data)

    } catch (error) {
        res.status(400).json(error)
    }
});

//Delete the blog using id params
router.delete('/deleteblog/:id', async (req, res) => {

    let id = req.params.id;

    try {
        let blog = await Blogs.deleteOne({ _id: id });
        if (blog.acknowledged) {
            return res.json({ msg: "Blog is successfully Deleted" })
        }

    } catch (error) {
        res.status(400).json(error);
    }
})

//update the blog by id params
router.put('/updateblog/:id', async (req, res) => {
    let id = req.params.id;

    try {
        let blog = await Blogs.findByIdAndUpdate(id, { $set: { tag: req.body.tag, artical: req.body.artical } }, { new: true });

        return res.json(blog);
    } catch (error) {
        res.status(400).json({msg:'Some thing is  Wrong'})
    }
})


module.exports = router;
