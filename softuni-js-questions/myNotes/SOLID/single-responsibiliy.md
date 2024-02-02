```sh
class Report {
  constructor(data) {
    this.data = data;
  }

  generateReport() {
    // Generating report logic
    console.log('Generating report...');
    // ...
  }

  sendEmail() {
    // Sending email logic
    console.log('Sending email...');
    // ...
  }
}

// Using the Report class
const report = new Report('Some data');
report.generateReport();
report.sendEmail();
```

focus on one responsibility per class, thus, refactor:

```sh
// Separating concerns into two classes

// Class responsible for generating a report
class ReportGenerator {
  constructor(data) {
    this.data = data;
  }

  generateReport() {
    // Generating report logic
    console.log('Generating report...');
    // ...
  }
}

// Class responsible for sending an email
class EmailSender {
  constructor() {
    // Email configuration setup
  }

  sendEmail(report) {
    // Sending email logic
    console.log('Sending email...');
    // ...
  }
}

// Using the refactored classes
const reportGenerator = new ReportGenerator('Some data');
const emailSender = new EmailSender();

const report = reportGenerator.generateReport();
emailSender.sendEmail(report);

```