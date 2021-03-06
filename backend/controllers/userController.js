const User = require("../models/User");
const bcrypt = require('bcryptjs');

exports.register = async (req,res) => {
    try {
         const { username, email, password } = req.body;

         
         let user = await User.findOne({ username });

         if(user) {
             return res.json({ error: "User with this username already exists." })
         };

         user = await User.findOne({ email });

         if(user) {
            return res.json({ error: "User with this email already exists." })
        };
        
        user = new User(req.body);

        await user.save();

        res.status(200).json({ 
            message: "Registered successfully.", 
            user: { _id: user._id , username: user.username, email: user.email
            }  
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req,res) => {
    const { email, password } = req.body;
    try {

        const user = await User.findOne({email: req.body.email});

        if(!user) {
            return res.json({ error: "User with this email does not exist."  })
        };


        const isMatched = await bcrypt.compare(password, user.password);
        
        if(!isMatched) {
            return res.json({ error: "Wrong password." })
        }

        const token = await user.getJwtToken();

        res.cookie("access_token", token, {
            httpOnly: true,
            // strict: 'same-site'
        }).json({ message: "Successfully logged in.", token, user: { username: user.username, email: user.email, role: user.role, _id: user._id } });
    } catch (error) {
        res.status(500).json( { error: error.message } );
    }
};

exports.myProfile = async (req,res) => {
    try {
        // const user = await User.findById(req.user._id);
        const user = req.user;
        const vreme = new Date(req.user.exp * 1000);
        // req.json({ 
        //     user: { 
        //         username: req.user.username, 
        //         _id: req.user._id, 
        //         email: req.user.email, 
        //         role: req.user.role, 
        //         exp: vreme
        //     } 
        // })
        res.json({ user: { username: user.username, email: user.email, _id: user._id, role: user.role, exp: user.exp } });
    } catch (error) {
        res.json({error:error.message})
    }
}


exports.logout = async (req,res) => {
    res.clearCookie("access_token").json({ message: 'Successfully logged out.' });
}