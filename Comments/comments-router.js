const express = require("express");
const db = require("../data/db");

const router = express.Router();

router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;

  db.findPostComments(postId).then(go => {
    if (go) {
      res.status(200).json(go);
    } else {
      res.status(404).json({
        message: `The post with the specified ID does not exist`
      });
    }
  });
});



router.post("/:id/comments", (req, res) => {
   
   const comment = {...req.body, post_id: req.params.id};

   console.log(comment)

   db.insertComment(comment)
   
     
   .then(go =>  {
      console.log(go)
       if (go) {
         res.status(201).json(comment);
       } else {
         res.status(404).json({
           errorMessage: `The post with the specified ID does not exist`
         });
       }
     })
     .catch(err => {
       res.status(500).json({
         errorMessage: `There was an error while saving the comment to the database`,
         err
       });
     });
 });


module.exports = router;
