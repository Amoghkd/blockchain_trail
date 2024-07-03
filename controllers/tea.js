// newTea function for post tea route
const newTea = (req, res, next) => {
    
    console.log(req.body) ;
    
    
    try {
        // Parse the string into an array
        const nameArray = req.body.name;
         console.log(nameArray) ;

         
    
        // Check if parsing was successful and if it's indeed an array
        //if (Array.isArray(nameArray)) {
          // Loop over the array
          for (let i = 0; i < nameArray.length; i++) {
            console.log(nameArray[i]);
        }
        const logMessages = [];

      // Log each value in the array and add it to the logMessages array
      nameArray.forEach(item => {
        const logMessage = `NAME: ${item}`;
        console.log(logMessage); // Print each item to the console
        logMessages.push(logMessage); // Add each log message to the array
      });

      // Send the logMessages array as the JSON response
      res.json(logMessages);
      
          
          
          
    
        res.status.send('Processed successfully');
      } 
      
      catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(400).send('Invalid input');
      }
    
    
      res.json({message: "POST new tea " +  req.body.name +" is the name "}); // dummy function for now
};

module.exports = {newTea};
