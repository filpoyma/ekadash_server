import Ekadash from '../models/ekadash.js';
import Moon from '../models/moon.js';
import EkadashInfo from '../models/ekadashInfo.js';
import { ekNames } from '../models/seed.js';
import Ekadashi from '../models/ekadashi.js';

const monthAbbreviations = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
];

function filterPrimitiveFields(obj) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      result[key] = obj[key];
    }
  }
  return result;
}

export const index = (req, res) => {
  res.send(`Server Status - OK`);
};

export const getEkadash = async (req, res) => {
  // return res.end(`Ekadashi saved.`);
  for (let i = 34; i <= 64; i++) {
    try {
      const response = await fetch(`https://ekadasi.info/api/years/${i}`);
      const ekadashi = await response.json();
      console.log('file-index.js ekadashi:', ekadashi.id);
      console.log('file-index.js ekadashi.value:', ekadashi.value);
      console.log('file-index.js ekadashi:', ekadashi);
      const ekadashas = new Ekadash({
        id: ekadashi.id,
        year: ekadashi.value,
        months: {
          jan: filterPrimitiveFields(ekadashi.jan),
          feb: filterPrimitiveFields(ekadashi.feb),
          mar: filterPrimitiveFields(ekadashi.mar),
          apr: filterPrimitiveFields(ekadashi.apr),
          may: filterPrimitiveFields(ekadashi.may),
          jun: filterPrimitiveFields(ekadashi.jun),
          jul: filterPrimitiveFields(ekadashi.jul),
          aug: filterPrimitiveFields(ekadashi.aug),
          sep: filterPrimitiveFields(ekadashi.sem),
          oct: filterPrimitiveFields(ekadashi.oct),
          nov: filterPrimitiveFields(ekadashi.nov),
          dec: filterPrimitiveFields(ekadashi.dem)
        },
        city: ekadashi.city,
        zone: ekadashi.zone
      });
      // await ekadashas.save();
      // await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      console.error('Error ekadashi:', err);
    }
  }
  res.end(`Ekadashi saved.`);
};

// const  getEkadash = async (req, res) => {
//   try {
//     const response = await fetch(`https://ekadasi.info/api/cities`);
//     const cities = await response.json();
//     console.log('file-index.js "hydra:member":', cities['hydra:member'].length);
//     const res = await Promise.all(
//       cities['hydra:member'].map(async (city) => {
//         const cityModel = new City(city);
//         return cityModel.save();
//       })
//     );
//     console.log('file-index.js getByName:', getByName);
//
//     // await new Promise((resolve) => setTimeout(resolve, 2000));
//   } catch (err) {
//     console.error('Error cities:', err);
//   }
//   res.end(`city saved.`);
// };

const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

export const EkadashInfoCreate = async (req, res) => {
  try {
    const res = await EkadashInfo.create(ekNames);
    console.log('file-index.js res:', res);
  } catch (err) {
    console.error('Error ekad:', err);
  }

  res.end(`ekad saved.`);
};

export const setMoonDays = async (req, res) => {
  try {
    for (let year = 2036; year <= 2038; year++) {
      //закончил на: 2038 8
      const ekadashDays = await Ekadash.findOne({ year });

      for (let month = 1; month <= 12; month++) {
        const res = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Aberdeen/${year}-${month}-${1}//${year}-${month}-${new Date(
            year,
            month,
            0
          ).getDate()}?key=JE4KXEV5FL3QHGJVAG3CZ3RX2&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const moonDays = await res.json();
        console.log('file-index.js year, month:', year, month);
        const datainsert = await Moon.insertMany(moonDays.days);
        console.log('All moon data saved successfully.', datainsert.length);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const ekadashDaysByMonth = Array.from(
          ekadashDays.months[monthAbbreviations[month - 1]].keys()
        );

        const fullAndNewMoonDays = moonDays.days
          .filter((item) => item.moonphase === 0 || item.moonphase === 0.5)
          .map((item) => {
            const date = new Date(item.datetime);
            return date.getDate().toString();
          });
        const happyDays = [...ekadashDaysByMonth, ...fullAndNewMoonDays];
        // console.log('file-index.js happyDays:', happyDays);
        // console.log('file-index.js year:', year);
        // console.log('file-index.js month:', month);
        // console.log('file-index.js keys:', ekadashDaysByMonth);

        // for (const day of ekadashDaysByMonth) {
        //   const res = await fetch(
        //     `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Aberdeen/${year}-${month}-${day}?key=JE4KXEV5FL3QHGJVAG3CZ3RX2&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`
        //   );
        //   const data = await res.json();
        //   console.log('file-index.js day:', day);
        //   console.log('file-index.js data:', data.days[0]);
        // const result = await Ekadash.updateOne(
        //   {
        //     year: year,
        //     [`months.${monthAbbreviations[month - 1]}.${day}`]: { $exists: true }
        //   },
        //   {
        //     $set: {
        //       [`months.${monthAbbreviations[month - 1]}.${day}.moon`]: data.days[0]
        //     }
        //   }
        // );
        // }

        // console.log(          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Aberdeen/${year}-${month}-1?key=JE4KXEV5FL3QHGJVAG3CZ3RX2&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`
        // );
        // const res = await fetch(
        //   `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Aberdeen/${year}-${month}-1?key=JE4KXEV5FL3QHGJVAG3CZ3RX2&include=days&elements=datetime,moonphase,sunrise,sunset,moonrise,moonset`
        // );
        // const moonDays = await res.json();
        // console.log('file-index.js moonDays:', moonDays.length);
        // const fullMoonDays = moonDays.days.filter((item) => (item.moonphase === 0 || item.moonphase === 0.5));

        // await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    res.end(`moon saved.`);
  } catch (err) {
    console.error(err);
    res.status(500).send(JSON.stringify(err.message));
  }
};

export const convertDb = async (req, res) => {
  for (let year = 2013; year <= 2043; year++) {
    console.log('<<<<<<<<<year>>>>>>>>>>>>:', year);
    const ekadash = await Ekadash.findOne({ year });
    for (const month of months) {
      for (let i = 1; i <= 31; i++) {
        const info = ekadash.months[month].get(i.toString());
        if (info) {
          console.log('file-index.js info.ekadasi_name:', info.ekadasi_name);
          const ekadashiInfo = await EkadashInfo.findOne({ name: info.ekadasi_name }, null, {
            lean: false
          });
          if (!ekadashiInfo) throw new Error(`EkadashiInfo not found: ${info.ekadasi_name}`);

          console.log('file-index.js ekadashiInfo:', ekadashiInfo?._id);
          console.log('file-index.js ekadashiInfo:', ekadashiInfo.name);
          const ekadashi = new Ekadashi({
            year,
            month: monthAbbreviations.indexOf(month) + 1,
            day: i,
            ekadasi_name: ekadashiInfo.name,
            description_data: ekadashiInfo._id,
            exit_time: info.exit_time
          });
          await ekadashi.save();
        }
        // console.log('file-index.js info:', info);
      }
    }
    res.end(`convert saved.`);
  }
};
