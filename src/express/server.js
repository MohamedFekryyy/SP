import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
const app = express();
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

app.post('/generate-pdf', async (req, res) => {
    // Extract the details from the request body
  const {
    clientName,
    clientCompany,
    clientEmail,
    freelancerEmail,
    freelancerName,
    projName,
    projDescription,
    projGoals,
    startDate,
    endDate,
    totalSum,
    items,
    milestones
  } = req.body;

  // Create HTML lists for proposal items and milestones
  const proposalItemsHtml = items.map(item => `<li>${item.title}: ${item.price}</li>`).join('');
  const milestoneItemsHtml = milestones.map(milestone => `<li>${milestone.title}: ${milestone.deliveryDate}</li>`).join('');

    let htmlContent = `
      <h1>Client Name: ${clientName}</h1>
      <p>Client Company: ${clientCompany}</p>
      <p>Client Email: ${clientEmail}</p>
      <p>Freelancer Email: ${freelancerEmail}</p>
      <p>Freelancer Name: ${freelancerName}</p>
      <p>Project Name: ${projName}</p>
      <p>Project Description: ${projDescription}</p>
      <p>Project Goals: ${projGoals}</p>
      <p>Start Date: ${startDate}</p>
      <p>End Date: ${endDate}</p>
      <p>Total Sum: ${totalSum}</p>
      <h2>Proposal Items:</h2>
      <ul>${proposalItemsHtml}</ul>
      <h2>Milestones:</h2>
      <ul>${milestoneItemsHtml}</ul>
      `;
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



  