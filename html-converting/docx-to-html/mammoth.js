const mammoth = require('mammoth');
const fs = require('fs');
const { JSDOM } = require('jsdom');

mammoth.convertToHtml({path: 'letter.docx'})
    .then(function(result){
        const html = result.value; // The generated HTML
        const messages = result.messages; // Any messages, such as warnings during conversion

        // Optional: prettify the HTML output using JSDOM
        const dom = new JSDOM(html);
        const prettyHtml = dom.serialize();

        // Write the HTML to a file
        fs.writeFileSync('output.html', prettyHtml);
    })
    .done();