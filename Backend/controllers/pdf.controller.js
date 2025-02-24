const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");

const pdfGen = async (req,res)=>{
    try {
        const reportData = {
            name: "John Doe",
            course: "Computer Engineering",
            semester: "5th",
            branch: "CSE",
            seatNumber: "12345",
            papers: [
                { code: "CSE101", date: "2024-12-01", name: "Operating Systems" },
                { code: "CSE102", date: "2024-12-05", name: "Database Management" }
            ]
        };

        // Ensure views folder path is correct
        const ejsPath = path.join(__dirname, "../public","views", "report.ejs");
        console.log(ejsPath);
        // Render HTML from EJS
        const html = await ejs.renderFile(ejsPath, reportData);

        // Generate PDF
        pdf.create(html, {}).toBuffer((err, buffer) => {
            if (err) {
                console.error("PDF Generation Error:", err);
                return res.status(500).send("Failed to generate PDF.");
            }

            // Set response headers for download
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", "attachment; filename=report.pdf");

            // Send PDF buffer to client
            res.send(buffer);
        });

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {pdfGen};