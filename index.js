const express = require('express');
const app = express();

let BLOGS = [];

app.use(express.json());

/**
 * Author
 * 1. Method: POST
 * 2. Route: '/blogs'
 * 3. Description: All Blog
*/
app.post('/blogs', (req, res) => {
    BLOGS.push({...req.body, id: BLOGS.length + 1});
    return res.json({message: "Blog created successfully!"})
})


/**
 * Author
 * 1. Method: GET
 * 2. Route: '/blogs'
 * 3. Description: Retrieve all blogs
*/
app.get('/blogs', (req, res) => {
    let publicBlogs = BLOGS.filter(blog => !blog.draft);
    return res.json({publicBlogs});
})


/**
 * Author
 * 1. Method: GET
 * 2. Route: '/blogs/:id'
 * 3. Description: Retrieve particular blog by id
*/
app.get('/blogs/:id', (req, res) => {
    const {id} = req.params;
    let searchBlogById = BLOGS.filter(blog => blog.id == id);
    return res.json({searchBlogById});
})


/**
 * Author
 * 1. Method: PATCH
 * 2. Route: '/blogs/:id'
 * 3. Description: Update particular blog by id
*/
app.patch('/blogs/:id', (req, res) => {
    const {id} = req.params;

    /**
     * Approach-1: findIndex
     * Copy previous content and then override on that content.
     * Isse ye hoga ki agar request blank aaegi to data wahi rahega.
    */

    // let index = BLOGS.findIndex(blog => blog.id == id);
    // BLOGS[index] = {...BLOGS[index], ...req.body}
    // return res.json({ message: "Blog updated successfully!"});

    /**
     * Approach-2: Map()
     * Agar blog.id == id hai to update kr do, otherwise prev BLOGS 
     * ko hi return kr do
    */
    let updateBlogs = BLOGS.map((blog, index) => blog.id == id ? ({ ...BLOGS[index], ...req.body }) : blog);
    BLOGS = [...updateBlogs]
    return res.json({ message: "Blog updated successfully!", updateBlogs});
})


/**
 * Author
 * 1. Method: DELETE
 * 2. Route: '/blogs/:id'
 * 3. Description: Delete particular blog by id
*/
app.delete('/blogs/:id', (req, res) => {
    
})

app.listen(3000, () => {
    console.log("Server started");
});