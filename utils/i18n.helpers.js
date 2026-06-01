/**
 * For catalog / autocomplete labels: Hindi clients get English (or base `name`) per product spec.
 * @param {string | undefined} headerLang from x-lang
 * @returns {string}
 */
export const resolveSuggestionLanguage = (headerLang) => {
  const raw = typeof headerLang === 'string' ? headerLang.trim().toLowerCase() : '';
  if (raw === 'hi') return 'en';
  return raw || 'en';
};

/**
 * @param {object | null | undefined} entity — document with name + translations
 * @param {string} language — i18n key e.g. ru, en (translations may omit `en`; use name)
 */
export const getLocalizedEntityName = (entity, language) => {
  if (!entity) return null;
  const normalized = typeof language === 'string' ? language.trim() : '';
  const translations = entity.translations ?? {};
  if (normalized && typeof translations[normalized] === 'string' && translations[normalized].length)
    return translations[normalized];
  return entity.name ?? null;
};

/**
 * $or clauses for catalog text search (name, native, translations[lang]).
 * @param {RegExp} searchRegex
 * @param {string | undefined} language — from x-lang header (res.locals.language)
 */
export const buildEntityTextSearchOr = (searchRegex, language) => {
  const searchLang = resolveSuggestionLanguage(language);
  const conditions = [{ name: searchRegex }, { native: searchRegex }];
  if (searchLang) {
    conditions.push({ [`translations.${searchLang}`]: searchRegex });
  }
  return conditions;
};
