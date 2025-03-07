import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

function getAllHeaders(data: Record<string, any>[]): string[] {
    const headersSet = new Set<string>();
    data.forEach(obj => Object.keys(obj).forEach(key => headersSet.add(key)));
    return Array.from(headersSet);
}


function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportToJSON(data: Record<string, any>[], filename: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    downloadBlob(blob, filename);
}

function convertToCSV(data: Record<string, any>[]): string {
    const headers = getAllHeaders(data);
    if (headers.length === 0) return '';
    const rows = data.map(obj =>
        headers.map(header => {
            let value = obj[header];
            if (value === null || value === undefined) value = '';
            value = String(value);
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                value = `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
}

function exportToCSV(data: Record<string, any>[], filename: string): void {
    const csvString = convertToCSV(data);
    const blob = new Blob([csvString], { type: 'text/csv' });
    downloadBlob(blob, `${filename}.csv`);
}


function exportToPDF(data: Record<string, any>[], filename: string): void {
    const doc = new jsPDF({ orientation: 'landscape' });
    const headers = getAllHeaders(data);
    const body = data.map(obj => headers.map(header => obj[header] || ''));
    const columnWidths = headers.map(header => {
        switch (header.toLowerCase()) {
            case 'createdat':
            case 'updatedat':
            case 'deletedat':
                return 25;
            default:
                return 30;
        }
    });

    autoTable(doc, {
        head: [headers],
        body: body,
        theme: 'striped',
        styles: {
            fontSize: 8,
            cellPadding: 2,
            overflow: 'linebreak',
        },
        headStyles: {
            fillColor: [22, 160, 133],
        },
        columnStyles: headers.reduce((acc, header, index) => {
            acc[index] = { cellWidth: columnWidths[index] };
            return acc;
        }, {} as { [key: number]: { cellWidth: number } }),
        margin: { top: 10, left: 10, right: 10, bottom: 10 },
    });

    doc.save(`${filename}.pdf`);
}

export type ExportFormats = 'json' | 'csv' | 'pdf'
export function exportData(
    data: Record<string, any>[],
    format: ExportFormats,
    filename: string = 'export'
): void {
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array');
    }

    switch (format.toLowerCase()) {
        case 'pdf':
            exportToPDF(data, filename);
            break;
        case 'json':
            exportToJSON(data, filename);
            break;
        case 'csv':
            exportToCSV(data, filename);
            break;
        default:
            throw new Error(`Unsupported format: ${format}`);
    }
}