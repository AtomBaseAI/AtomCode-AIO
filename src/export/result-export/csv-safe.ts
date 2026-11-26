/**
 * CSV formula-injection guard (audit finding): spreadsheet apps (Excel,
 * LibreOffice, Google Sheets) execute cell content starting with =, +, -,
 * @ or a tab/CR as a formula. Prefixing such cells with a single quote
 * forces them to be treated as text.
 *
 * Applies to every exported string cell in user-influenced columns
 * (names, roll numbers, emails, titles, …).
 */
export function csvSafeCell(value: string): string {
    if (
        value.length > 0 &&
        ("=+-@".includes(value.charAt(0)) ||
            value.charAt(0) === "\t" ||
            value.charAt(0) === "\r" ||
            value.charAt(0) === "\n")
    ) {
        return `'${value}`;
    }
    return value;
}
