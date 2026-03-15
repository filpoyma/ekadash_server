const pushNotificationsVariants = {
  ru: [
    {
      title: '🌕 Напоминание: Скоро EKADASHINAME!',
      message:
        'Не забудьте, DATE — священный день Экадаши. Это время для поста, молитв и духовных практик. Пусть этот день принесёт вам благословения и внутреннюю гармонию. 🙏'
    },
    {
      title: '🌟 EKADASHINAME уже скоро!',
      message:
        'DATE наступает особый день — Экадаши. Используйте эту возможность для очищения тела и души, медитации и молитв. Пусть этот день наполнит вашу жизнь светом и благодатью. 🌸'
    },
    {
      title: '🕉️ Готовы к EKADASHINAME?',
      message:
        'День DATE — это шанс укрепить свою связь с духовным миром. Пост, молитвы и размышления помогут вам обрести внутренний покой. Пусть Экадаши принесёт вам мудрость и силу! 🙌'
    },
    {
      title: '📿 EKADASHINAME. День очищения',
      message:
        'DATE — священный день Экадаши. Соблюдайте пост, посвятите время молитвам и духовным практикам. Пусть этот день станет шагом на пути к гармонии и просветлению. 🌿'
    },
    {
      title: '🌙 EKADASHINAME уже близко!',
      message:
        'Не пропустите DATE Экадаши! Это время для духовного роста, очищения и медитации. Пусть этот день принесёт вам мир и вдохновение. 🕊️'
    },
    {
      title: '🕉️ Скоро EKADASHINAME',
      message:
        'Напоминаем, что DATE — священный день Экадаши. Проведите его в молитвах и размышлениях. Пусть этот день будет благословенным! 🙏'
    }
  ],
  en: [
    {
      title: '🌕 Reminder: EKADASHINAME Soon!',
      message:
        'Don’t forget that DATE is the sacred day of Ekadashi. It’s a time for fasting, prayers, and spiritual practices. May this day bring you blessings and inner harmony. 🙏'
    },

    {
      title: '🌟 EKADASHINAME is Almost Here!',
      message:
        'Don’t miss tomorrow’s Ekadashi! It’s a time for spiritual growth, purification, and meditation. May this day bring you peace and inspiration. 🕊️'
    },
    {
      title: '🕉️ Ready for EKADASHINAME?',
      message:
        'DATE is a chance to strengthen your connection with the spiritual world. Fasting, prayers, and reflection will help you find inner peace. May Ekadashi bring you wisdom and strength! 🙌'
    },
    {
      title: '📿 EKADASHINAME. A Day of Purification',
      message:
        'DATE is the sacred day of Ekadashi. Observe the fast, dedicate time to prayers and spiritual practices. May this day become a step toward harmony and enlightenment. 🌿'
    },
    {
      title: '🌙 EKADASHINAME is Almost Here!',
      message:
        'Don’t miss DATE! It’s a time for spiritual growth, purification, and meditation. May this day bring you peace and inspiration. 🕊️'
    },
    {
      title: '🕉️ EKADASHINAME',
      message:
        'A reminder that DATE is the sacred day of Ekadashi. Spend it in prayers and reflection. May this day be blessed! 🙏'
    }
  ]
};

export const getNotificationsVariants = (locale = 'en', date = '', name = '', ekadashInfoId = '', uniqName = '') => {
  const random = Math.floor(Math.random() * 6);
  const variant = pushNotificationsVariants[locale][random];

  return {
    data: {ekadashInfoId, uniqName},
    title: variant.title.replace(/EKADASHINAME/g, name).replace(/DATE/g, date),
    message: variant.message.replace(/EKADASHINAME/g, name).replace(/DATE/g, date)
  };
};

