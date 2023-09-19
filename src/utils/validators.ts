export const required = (value: string) => {
    if (value) return undefined;
    return 'Field is required';
}
export const maxLengthCreator = (maxLength: any) => (value: string) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}