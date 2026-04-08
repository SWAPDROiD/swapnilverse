import { en } from "./en-us";

export const i18n = en;

/**
 * Translation helper function
 * 
 * This function serves as a placeholder for internationalization support.
 * It currently returns the input value as-is, ensuring zero behavioral
 * changes during the i18n migration. This allows the UI to be set up
 * for multi-language support without affecting current functionality.
 * 
 * @param value - The translation key value
 * @returns The same value (identity function)
 */
export const t = (value: string): string => value;

export type I18n = typeof en;
