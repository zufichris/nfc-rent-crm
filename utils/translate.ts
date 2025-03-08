import { Languages, Locale } from "@/types/language";
import t from "@google-cloud/translate"
const translate = new t.v2.Translate({
  apiKey: "",
})


interface ITranslateResponse<T = unknown> {
  success: boolean,
  data?: T,
  err?: string
}
async function translateText(text: string, options: { to: Locale, from?: Locale }): Promise<ITranslateResponse<string>> {
  try {
    const [translation] = await translate.translate(text, {
      to: options.to,
      from: options?.from ?? "en"
    });
    return {
      success: true,
      data: translation
    };
  } catch (error) {
    return {
      success: false,
      err: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function translateToLocales(text: string, {
  from = "en",
  to = Languages.filter(x => x.code !== "en").map(l => l.code)
}: {
  from: Locale,
  to?: Locale[]
}): Promise<ITranslateResponse<Record<Locale, string>>> {
  try {
    const res = await Promise.all(
      to.map(async (l: Locale) => {
        const res = await translateText(text, {
          to: l,
          from: from
        });
        return { [l as Locale]: res.data ?? "" };
      })
    );
    const translations = res.reduce((obj, v) => ({ ...obj, ...v }), {}) as Record<Locale, string>
    return {
      success: true,
      data: {
        ...translations,
        [from]: text
      }
    };
  } catch (error) {
    return {
      success: false,
      err: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
