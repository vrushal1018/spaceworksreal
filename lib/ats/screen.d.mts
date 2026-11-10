export declare const RUBRICS: any;
export declare function extractText(buffer: Buffer, filename: string): Promise<string>;
export declare function screen(text: string, form: { role: string; experience?: string; city?: string; notice?: string }): {
  role: string; score: number; band: "Shortlist" | "Review" | "Hold"; next: string; breakdown: Record<string, number>;
  experience: { years: number | null; source: string }; matched: string[]; missing: string[]; flags: string[];
};
