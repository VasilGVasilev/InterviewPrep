(function () {

    // 1. Parse eventDate (DD‑MM‑YYYY) → JS Date
    const [day, month, year] = "15-02-2025".split("-");
    const event = new Date(Number(year), Number(month) - 1, Number(day)); // JS months are 0‑based

    // 2. Parse beginDate / endDate which are in a custom format
    const rawBegin = "2025‑02‑01T00:00:00Z"; // Example input
    const rawEnd = "2026‑02‑01T00:00:00Z";   // Example input

    // Ensure the strings are valid ISO 8601 dates
    const begin = new Date(rawBegin.replace(/‑/g, "-")); // Replace non-standard dashes
    const end = new Date(rawEnd.replace(/‑/g, "-"));     // Replace non-standard dashes

    console.log("Event Date:", event);
    console.log("Begin Date:", begin);
    console.log("End Date:", end);

    // 3. Check range (inclusive)
    if (event >= begin && event <= end) {
        console.log("Valid event");
    } else {
        console.log("Invalid event");
    }
})();