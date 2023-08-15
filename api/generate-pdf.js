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
  const proposalItemsHtml = items.map(item => `<li style="color:#030616; font-family: Bricolage Grotesque; font-size: 20px;">${item.title} ${item.price}</li>`).join('');
  const milestoneItemsHtml = milestones.map(milestone => `<li>${milestone.title}: ${milestone.deliveryDate}</li>`).join('');

    let htmlContent = `<html>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@10..48,400;10..48,500;10..48,600&family=Inter:wght@400;500&display=swap" rel="stylesheet">        
    
        </head>
        <body style="margin: 0;">
        <div style="background-color: #030616; padding: 40px;">
        <h1 style="margin-top: 0px; margin-bottom: 0px; min-width: 100%; font-family: Bricolage Grotesque; font-size: 36px; color: white;">${projName}</h1>
        <div style="height: 1px; background-color: black; min-width: 100%;"></div>
        <div></div>
        <p style="font-family: inter; color: white; font-size: 20px; margin-top: 16px; margin-bottom: 0px; font-weight: 500;"><span style="color: rgba(255, 255, 255, 0.70); font-weight: 400;">Prepared for</span>  ${clientName} <span style="color:rgba(255, 255, 255, 0.70);">•</span> ${clientCompany}</p>
        <div style="  display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: normal;
        align-items: center;
        gap: 18px;
        align-content: stretch; color: white; margin-top: 60px;">
            <p style="margin: 0; font-size: 18px; font-family: inter;">${freelancerName}</p>
            <p style="margin: 0; font-size: 18px; font-family: inter;">${freelancerEmail}</p>
        </div>
        </div>
        
        <div style="margin: 40px;">
        <p style="margin-top: 0px; margin-bottom: 0px; color: #595B65; font-size: 18px; font-family: inter; font-weight: 500;">Project Description</p>
        <p style="margin-bottom: 0px; margin-top: 12px; font-size: 16px; font-family: inter; color: #424450; line-height: 160%;">${projDescription}</p>
        </div>
        <div style="height: 1px; background-color: #E1E1E3;"></div>

        <div style="margin: 40px;">
            <p style="margin-top: 0px; margin-bottom: 0px; color: #595B65; font-size: 18px; font-family: inter; font-weight: 500;">Project Goals</p>
            <p style="margin-bottom: 0px; margin-top: 12px; font-size: 16px; font-family: inter; color: #424450; line-height: 160%;">${projGoals}</p>
            </div>
            <div style="height: 1px; background-color: #E1E1E3;"></div>

        
        <div style="margin: 40px;">
        <h2  style="margin-top: 0px; margin-bottom: 0px; color: #595B65; font-size: 18px; font-family: inter; font-weight: 500;">Proposal Items</h2>
        <ul  style="list-style: none; background-color: #F0F0F1; padding: 16px; gap: 16px; display: flex; flex-direction: column;">${proposalItemsHtml}</ul>
        <p style="align-items: end; min-width: 100%; ">Total Sum: ${totalSum}</p>
    </div>
    <div style="height: 1px; background-color: #E1E1E3;"></div>


        <h2>Milestones:</h2>
        <ul>${milestoneItemsHtml}</ul>
        <p>Start Date: ${startDate}</p>
        <p>End Date: ${endDate}</p>
      
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



  