const express = require('express');
const router = express.Router();

const Person=require('../models/person');

router.post('/',async(req,res)=>
{
    try{
        const data=req.body;
        const newPerson=new Person(data);
        const response=await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get('/',async(req,res)=>
{
    try{
        const data=await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.get('/:workType',async(req,res)=>
{
    try{
        const workType=req.params.workType;
        if(workType=='chef'||workType=='manager'||workType=='waiter'||workType=='SDE')
        {
            const response=await Person.find({work:workType});
            console.log("response fetchd");
            res.status(200).json(response);
        }
        else
        {
            res.status(404).json({error:"Invald work typee"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the person's ID from the URL parameter
      const updatedPersonData = req.body; // Updated data for the person
      // Assuming you have a Person model
      const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      });
  
      if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send the updated person data as a JSON response
      res.json(updatedPerson);
    } catch (error) {
      console.error('Error updating person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the person's ID from the URL parameter
  
      // Assuming you have a Person model
      const deletedPerson = await Person.findByIdAndDelete(personId);
  
      if (!deletedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send a success message as a JSON response
      res.json({ message: 'Person deleted successfully' });
    } catch (error) {
      console.error('Error deleting person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports=router;