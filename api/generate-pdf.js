import puppeteer from 'puppeteer';

const generatePdf = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
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
    milestones,
    preFilledText,
  } = req.body;

  // Create HTML lists for proposal items and milestones
  const proposalItemsHtml = items.map(item => `<li>${item.title}: ${item.price}</li>`).join('');
  const milestoneItemsHtml = milestones.map(milestone => `<li>${milestone.title}: ${milestone.deliveryDate}</li>`).join('');

    let htmlContent = `<html>
    <head>
   
    </head>
    <body style="padding: 0px !important">
    
    <div style="background-color: #030616; padding: 40px;">

      <p>Start Date: ${startDate}</p>
      <p>End Date: ${endDate}</p>
      <p>Total Sum: ${totalSum}</p>
      <h2>Proposal Items:</h2>
      <ul>${proposalItemsHtml}</ul>
      <h2>Milestones:</h2>
      <ul>${milestoneItemsHtml}</ul>
      <h2>Terms & Conditions:${preFilledText}</h2>
      </body>
      </html>`;

      try {

    // Launch Puppeteer and generate the PDF
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
  
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  
    await browser.close();
} catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).send('Failed to generate PDF');
  }
};
export default generatePdf;



  