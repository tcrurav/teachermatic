export function formatTo3Zeros(value: number): string {
    let formattedNumber = String(value);

    if (formattedNumber.length == 1) formattedNumber = '00' + formattedNumber
    else if (formattedNumber.length == 2) formattedNumber = '0' + formattedNumber;

    return formattedNumber;
}