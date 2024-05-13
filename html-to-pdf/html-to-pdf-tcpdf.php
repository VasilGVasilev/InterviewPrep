<?php
require 'vendor/autoload.php';

// Check if file is uploaded
if(isset($_FILES['fileToUpload'])) {
    $errors = array();
    $file_name = $_FILES['fileToUpload']['name'];
    $file_size = $_FILES['fileToUpload']['size'];
    $file_tmp = $_FILES['fileToUpload']['tmp_name'];
    $file_type = $_FILES['fileToUpload']['type'];
    $file_parts = explode('.', $_FILES['fileToUpload']['name']);
    $file_ext = strtolower(end($file_parts));

    $extensions = array("html","htm");

    if(in_array($file_ext,$extensions) === false){
        $errors[] = "extension not allowed, please choose a HTML file.";
    }

    if(empty($errors) == true) {
        // Read the file content
        $htmlContent = file_get_contents($file_tmp);

        // create new PDF document
        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

        // set document information
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('Your Name');
        $pdf->SetTitle('TCPDF Example');
        $pdf->SetSubject('TCPDF Tutorial');
        $pdf->SetKeywords('TCPDF, PDF, example, test, guide');

        // add a page
        $pdf->AddPage();

        // write HTML content
        $pdf->writeHTML($htmlContent, true, false, true, false, '');

        // Turn off error reporting
        error_reporting(0);

        //Close and output PDF document
        $pdf->Output('example.pdf', 'I');

        // Turn error reporting back on
        error_reporting(E_ALL);
    } else {
        print_r($errors);
    }
} else {
    // Display the upload form if no file is uploaded
    echo '
    <form action="" method="post" enctype="multipart/form-data">
        Избери HTML файл за качване(TCPDF):
        <input type="file" name="fileToUpload" id="fileToUpload">
        <input type="submit" value="Конвертирай" name="submit">
    </form>
    ';
}
?>