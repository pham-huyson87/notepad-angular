import * as moment from 'moment';

const dateFormat: string = "YYYY-MM-DD";


export function convertToStringDate(value: string): string {
    return moment(value).format(dateFormat);
}

export function extractStringOnly(value: string) {
    return String(value).replace(/\s/g, "");
}

export function extractNumberOnly(value: string) {
    return String(String(value).replace(/\D/g, "")).trim();
}
