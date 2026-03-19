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
  ],
  hi: [
    {
      title: '🌕 स्मरण: जल्द ही EKADASHINAME!',
      message:
        'मत भूलिए, DATE पवित्र एकादशी का दिन है। यह उपवास, प्रार्थना और आध्यात्मिक साधना का समय है। यह दिन आपको आशीर्वाद और आंतरिक शांति प्रदान करे। 🙏'
    },
    {
      title: '🌟 EKADASHINAME जल्द ही आ रही है!',
      message:
        'DATE को विशेष दिन — एकादशी — आने वाला है। इस अवसर का उपयोग शरीर और आत्मा की शुद्धि, ध्यान और प्रार्थना के लिए करें। यह दिन आपके जीवन को प्रकाश और कृपा से भर दे। 🌸'
    },
    {
      title: '🕉️ क्या आप EKADASHINAME के लिए तैयार हैं?',
      message:
        'DATE का दिन आध्यात्मिक जगत से अपने संबंध को मजबूत करने का अवसर है। उपवास, प्रार्थना और चिंतन आपको आंतरिक शांति दिलाएंगे। एकादशी आपको ज्ञान और शक्ति प्रदान करे! 🙌'
    },
    {
      title: '📿 EKADASHINAME — शुद्धि का दिन',
      message:
        'DATE पवित्र एकादशी का दिन है। उपवास रखें, प्रार्थना और आध्यात्मिक साधना में समय दें। यह दिन आपको सामंजस्य और आत्मिक जागरण की ओर एक कदम आगे ले जाए। 🌿'
    },
    {
      title: '🌙 EKADASHINAME निकट है!',
      message:
        'DATE की एकादशी को न भूलें! यह आध्यात्मिक उन्नति, शुद्धि और ध्यान का समय है। यह दिन आपको शांति और प्रेरणा प्रदान करे। 🕊️'
    },
    {
      title: '🕉️ जल्द ही EKADASHINAME',
      message:
        'स्मरण रहे कि DATE पवित्र एकादशी का दिन है। इसे प्रार्थना और चिंतन में बिताएँ। यह दिन आपके लिए शुभ और मंगलमय हो! 🙏'
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

