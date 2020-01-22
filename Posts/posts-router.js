const express = require('express');
const Posts = require('../data/db');


const router = express.Router();


router.get('/', ( req,res ) => {
  console.log(req.query);
  Posts.find(req.query)
    .then(go => {
      res.status(200).json(go);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json({
        message: `The posts information could not be retrieved.`,
      });
    });
});

router.get('/:id', ( req,res ) => {
  const {id} = req.params;

  console.log(req.query);
  Posts.findById(id)
    .then(go => {
      if(go) {
        res.status(200).json(go);
      } else {
        res.status(404).json({
          message: `The post with the specified ID does not exist`
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: `The post could not be removed`, err
      });
    });
});

router.post('/', ( req,res ) => {
  const info = req.body;

  Posts.insert(info)
    .then(go => {
      if(go) {
        res.status(201).json(info)
      } else {
        res.status(400).json({
          message: `Please provide title and contents for the post`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: `There was an error while saving the post to the database`, err
      });
    });
});

router.delete('/:id', (req,res) => {
  const {id} = req.params;

  Posts.remove(id)
     .then(cut => {
        if (cut) {
           res.status(204).end();
        } else {
           res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
     })
     .catch(err => {
        res.status(500).json({ errorMessage: "The user information could not be modified.", err });
     });
});

router.put('/:id', (req,res) => {
  const {id} = req.params;
  const info = req.body;

  Posts.update(id, info) 
     .then(edit => {
        if (edit) {
           res.status(200).json(info);
        } else if (edit) {
           res.status(400).json({ errorMessage: "Please provide title and content for the user." });
        } else {
           res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
     })
     .catch(err => {
        res.status(500).json({ errorMessage: "The post could not be modified."},err);
     });
});


// router.post("/:id/comments", (req, res) => {
   
//   const comment = {...req.body, post_id: req.params.id};

//   console.log(comment)

//   Posts.insertComment(comment)
  
    
//   .then(go =>  {
//      console.log(go)
//       if (go) {
//         res.status(201).json(comment);
//       } else {
//         res.status(404).json({
//           errorMessage: `The post with the specified ID does not exist`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({
//         errorMessage: `There was an error while saving the comment to the database`,
//         err
//       });
//     });
// });

module.exports = router;