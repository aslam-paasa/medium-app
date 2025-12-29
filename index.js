const express = require('express');
const app = express();

let BLOGS = [];
let USERS = [];

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


/**
 * Users
 * 1. Method: POST
 * 2. Route: '/users'
 * 3. Description: Add User
*/
app.post('/users', (req, res) => {
    const {name, password, email} = req.body;

    try {
        if(!name) {
            return res.status(400).json({
                success: false,
                message: "Please enter the name"
            })
        }
        if(!password) {
            return res.status(400).json({
                success: false,
                message: "Please enter the password"
            })
        }
        if(!email) {
            return res.status(400).json({
                success: false,
                message: "Please enter the email"
            })
        }

        USERS.push({...req.body, id: USERS.length + 1});
        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Please try again"
        })
    }
})


/**
 * Users
 * 1. Method: GET
 * 2. Route: '/users'
 * 3. Description: Retrieve all users
*/
app.get('/users', (req, res) => {
    try {

        // DB Call

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            USERS
        })
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: "Error occurred while fetching the users"
        })
    }
})


/**
 * Users
 * 1. Method: GET
 * 2. Route: '/users/:id'
 * 3. Description: Retrieve particular user by id
*/
app.get('/users/:id', (req, res) => {
    try {

        // DB Call

        const userId = USERS.filter((user) => user.id == req.params.id)

        if(userId.length == 0) {
            return res.status(200).json({
                success: false,
                message: "User not found",
                userId
            })
        }

        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            userId
        })
    } catch (err) {
        return res.status(500).json({
            success: true,
            message: "Error occurred while fetching the users"
        })
    }
})


/**
 * Users
 * 1. Method: PATCH
 * 2. Route: '/users/:id'
 * 3. Description: Update particular user by id
*/
app.patch('/users/:id', (req, res) => {
    const {id} = req.params;

    /**
     * Approach-1: findIndex
     * Copy previous content and then override on that content.
     * Isse ye hoga ki agar request blank aaegi to data wahi rahega.
    */

    // let index = USERS.findIndex(user => user.id == id);
    // USERS[index] = {...USERS[index], ...req.body}
    // return res.json({ message: "User updated successfully!"});

    /**
     * Approach-2: Map()
     * Agar user.id == id hai to update kr do, otherwise prev USERS 
     * ko hi return kr do
    */
    let updateUsers = USERS.map((user, index) => user.id == id ? ({ ...USERS[index], ...req.body }) : user);
    USERS = [...updateUsers]
    return res.json({ message: "User updated successfully!", updateUsers});
})


/**
 * Users
 * 1. Method: DELETE
 * 2. Route: '/users/:id'
 * 3. Description: Delete particular user by id
*/
app.delete('/users/:id', (req, res) => {
    
})


app.listen(3000, () => {
    console.log("Server started");
});