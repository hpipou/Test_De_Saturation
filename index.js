const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();
require("dotenv").config()


app.get('/', async (req, res) => {
    try {
        
      const requests = [];
      let successfulRequests = 0;
      let errorRequests = 0;
  
      for (let i = 0; i < process.env.NBREQUEST; i++) {
        const startTime = performance.now();
  
        const request = axios.post(process.env.REMOTESERVER, JSON.parse(process.env.BODY))
        .then(response => {
          const endTime = performance.now();
          const duration = endTime - startTime;
  
          const log = `Response for request ${i+1}: ${JSON.stringify(response.data)}\n`;
          const timeLog = `Duration for request ${i+1}: ${duration} ms\n`;
  
          fs.appendFile(process.env.FILENAME, log, (err) => {
            if (err) {
              console.error(`Error writing to logs.txt:`, err);
            }
          });
  
          fs.appendFile(process.env.FILENAME, timeLog, (err) => {
            if (err) {
              console.error(`Error writing to logs.txt:`, err);
            }
          });
  
          successfulRequests++; // Incrémenter le compteur de requêtes réussies
        })
        .catch(error => {
          const endTime = performance.now();
          const duration = endTime - startTime;
  
          const log = `Error for request ${i+1}: ${error}\n`;
          const timeLog = `Duration for request ${i+1}: ${duration} ms\n`;
  
          fs.appendFile(process.env.FILENAME, log, (err) => {
            if (err) {
              console.error(`Error writing to logs.txt:`, err);
            }
          });
  
          fs.appendFile(process.env.FILENAME, timeLog, (err) => {
            if (err) {
              console.error(`Error writing to logs.txt:`, err);
            }
          });
  
          errorRequests++; // Incrémenter le compteur de requêtes d'erreur
        });
  
        requests.push(request);
      }
  
      await Promise.all(requests);
  
      return res.status(200).json(
        {
            "status":"Simulation completed",
            "nb_request": parseInt(process.env.NBREQUEST),
            "success": successfulRequests,
            "error":errorRequests
        });
        // `Simulation completed.<br> Successful requests: ${successfulRequests}<br>Error requests: ${errorRequests}`
    } catch (error) {
      return res.status(500).json({"status":"Simulation failed"});
    }
});
  
app.listen(process.env.SERVERPORT, () => {
    console.log('Server started on port ' + process.env.SERVERPORT);
});
  