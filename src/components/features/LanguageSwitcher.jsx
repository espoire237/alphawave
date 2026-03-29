import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('lang', code); // persist choice
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {languages.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          style={{
            padding: '6px 12px',
            cursor: 'pointer',
            fontWeight: i18n.language === code ? 'bold' : 'normal',
            borderBottom: i18n.language === code ? '2px solid blue' : 'none',
            background: 'none',
            border: 'none',
          }}
        >
          {flag} {label}
        </button>
      ))}
    </div>
  );
}