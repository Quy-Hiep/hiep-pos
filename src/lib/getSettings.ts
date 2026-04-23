import { prisma } from "@/lib/prisma";

/**
 * Fetch settings from DB and return as a key→value map.
 * Falls back to provided defaults for missing keys.
 */
export async function getSettings(
  keys: string[],
  defaults: Record<string, string> = {}
): Promise<Record<string, string>> {
  const rows = await prisma.setting.findMany({
    where: { key: { in: keys } },
  });
  const result: Record<string, string> = { ...defaults };
  for (const row of rows) {
    result[row.key] = row.value;
  }
  return result;
}
