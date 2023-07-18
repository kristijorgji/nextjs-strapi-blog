export function trimEllip(value: string, maxLength: number): string {
    return value.length < maxLength - 3 ? value : `${value.substring(0, maxLength)}...`;
}
