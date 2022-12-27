

export const regex_filter = /[^a-zA-Z0-9-]/g;

export const valid = (s: string) => s.replace(regex_filter, '_').toLowerCase();
