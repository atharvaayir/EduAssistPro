const path = require("path");
const pdf = require("html-pdf");
const qr = require("qrcode");
const fs = require("fs");
const { renderAndGenPdf, genPdf } = require("../utils/pdfGeneration.js");
const { renderEjs } = require("../utils/renderEjs.js");

const admitCardHandler = async (req, res) => {
  try {
    // user image
    const imagePath = path.join(__dirname, "../public/images/user_image.jpg");
    const imageBase64 = fs.readFileSync(imagePath, "base64");

    // qr image
    const qrString = "9kxpzWiciusKyzDWtVZFbC97E40riCUc4WMnuQlj"; // Your dynamic data
    const qrCodeBase64 = await qr.toDataURL(qrString);

    const reportData = {
      name: "John Doe",
      course: "Computer Engineering",
      semester: "5th",
      branch: "Computer Engineering Department",
      seatNumber: "12345",
      userImage: `data:image/png;base64,${imageBase64}`,
      qrImage: qrCodeBase64,
      papers: [
        { code: "CSE101", date: "2024-12-01", name: "Operating Systems" },
        { code: "CSE102", date: "2024-12-05", name: "Database Management" },
      ],
    };
    const file = await renderAndGenPdf("report.ejs", reportData);

    // Generate PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

    // Send PDF buffer to client
    res.end(file);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
};

const sheetQrHandler = async (req, res) => {
  try {
    let data = {};
    const { quantity, start } = req.body;
    for (let i = 0; i < quantity; i++)
      data[Number(start) + i] = await qr.toDataURL(`${Number(start) + i}`);

    const file = await renderAndGenPdf("qrSheets.ejs", { data });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=qrSheet.pdf");
    res.end(file);
  } catch (error) {
    console.error("Error generating QR sheet:", error);
    res.status(500).send("Internal Server Error");
  }
};

const attendanceSheetPdfHandler = async (req, res) => {
  try {
    // max seat number length = 21
    // per page 3-columns and 16-rows

    // random vars
    const c = 6, r = 40;
    const data = {
        columns: c,
        rows: r,
        seatNumbers:Array.from({ length: c }, () => 
            Array.from({ length: r }, () => Math.random().toString(36).substring(2, 10))
          ),
        attendance:Array.from({ length: c }, () => 
            Array.from({ length: r }, () => Math.random()<0.5)
          )
    };

    const className = "CR-7";
    const invigilatorName = "John Doe";

    const html = await renderEjs("attendanceSheet.ejs", data);
    const file = await genPdf(html,{
      displayHeaderFooter: true, // Enable header/footer
      headerTemplate: `
                <div style="font-size: 24px; text-align: center; width: 100%; padding-top: 5px;">
                    <span style="font-weight: bold;">Attendance Sheet </span>
                    <br>
                    <span style="font-size:16px">
                        ${className}
                        | 
                        Invigilator - 
                            ${invigilatorName}
                      </span>
                </div>
            `,
      footerTemplate: `<div></div>`, // No footer
      margin: {
        top: "90px", // Space for the header
        bottom: "20px",
      },
      printBackground: true,
    });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=attendanceSheet.pdf"
    );
    res.end(file);
  } catch (error) {
    console.error("Error generating Attendance sheet pdf:", error);
    res.status(500).send("Internal Server Error");
  }
};

const StudentSheetLinkPdfHandler = async (req,res) => {
    try {

      const className = "CR-7";
      const invigilatorName = "John Doe";
      // max rows on single page is 44
      const data = [
        {
            seatNumber: "12345",
            mainSheet: "50001",
            supplement: ["80001", "80002", "80003", "80004"]
        },
        {
            seatNumber: "67890",
            mainSheet: "50002",
            supplement: ["80005", "80006"]
        },
        {
            seatNumber: "13579",
            mainSheet: "50003",
            supplement: ["80007", "80008", "80009"]
        },
        {
            seatNumber: "24680",
            mainSheet: "50004",
            supplement: ["80010"]
        },
        {
            seatNumber: "11223",
            mainSheet: "50005",
            supplement: ["80011", "80012", "80013", "80014", "80015","80011", "80012", "80013", "80014", "80015","80011", "80012", "80013", "80014", "80015",]
        },
        {
            seatNumber: "44556",
            // mainSheet: "50006",
            supplement: [] // Example with empty supplement array
        },
        {
            seatNumber: "77889",
            mainSheet: "50007",
            supplement: ["80016", "80017"]
        },
        {
            seatNumber: "98765",
            mainSheet: "50008",
            supplement: ["80018"]
        },
        {
            seatNumber: "54321",
            mainSheet: "50009",
            supplement: ["80019", "80020", "80021"]
        },
        {
            seatNumber: "10101",
            mainSheet: "50010",
            supplement: ["80022"]
        },
    
      ];
      const html = await renderEjs("studentSheetLink.ejs",{data});
      const file = await genPdf(html,{
        displayHeaderFooter: true, // Enable header/footer
        headerTemplate: `
                  <div style="font-size: 24px; text-align: center; width: 100%; padding-top: 5px;">
                      <span style="font-weight: bold;">Attendance Sheet </span>
                      <br>
                      <span style="font-size:16px">
                          ${className}
                          | 
                          Invigilator - 
                              ${invigilatorName}
                        </span>
                  </div>
              `,
        footerTemplate: `<div></div>`, // No footer
        margin: {
          top: "90px", // Space for the header
          bottom: "20px",
        },
        printBackground: true,
      });
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=studentSheetLink.pdf"
      );
      res.end(file);
    } catch (error) {
      console.error("Error generating Student Sheet Link pdf:", error);
      res.status(500).send("Internal Server Error");
    }
}

module.exports = {
  admitCardHandler,
  sheetQrHandler,
  attendanceSheetPdfHandler,
  StudentSheetLinkPdfHandler
};
