const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
app.use(express.json()); // To parse JSON request bodies

app.post('/generate-pdf', async (req, res) => {
    // Extract the HTML content and other details from the request body
    let htmlContent = '<html>
    <head>
      <style>
        /* Add your CSS styles here */
      </style>
    </head>
    <body>
      <h1>Client Name: ${formData.clientName}</h1>
      <p>Client Company: ${formData.clientCompany}</p>
      <p>Client Email: ${formData.clientEmail}</p>
      <p>Freelancer Email: ${formData.freelancerEmail}</p>
      <p>Freelancer Name: ${formData.freelancerName}</p>
      <p>Project Name: ${formData.projName}</p>
      <p>Project Description: ${formData.projDescription}</p>
      <p>Project Goals: ${formData.projGoals}</p>
      <p>Start Date: ${startDate}</p>
      <p>End Date: ${endDate}</p>
      <p>Total Sum: ${totalSum}</p>
      <h2>Proposal Items:</h2>
      <ul>${proposalItemsHtml}</ul>
      <h2>Milestones:</h2>
      <ul>${milestoneItemsHtml}</ul>
    </body>
  </html>
'
    // Launch Puppeteer and generate the PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdf = await page.pdf({ format: 'A4' });
  
    // Send the PDF back as a response
    res.contentType('application/pdf');
    res.send(pdf);
  
    // Close Puppeteer
    await browser.close();
  });

  const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

  