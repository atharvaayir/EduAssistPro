const ejs = require("ejs");
const path = require("path");

const renderEjs = async (htmlFileName,data) => {
    try {
        const renderedHtml = await ejs.renderFile(
            path.join(path.resolve(),"public",'views',htmlFileName),
            data
        );
        
        return renderedHtml;
    } catch (error) {
        console.log("error rendering html : ",error);
        return "";
    }
}
module.exports = {renderEjs};