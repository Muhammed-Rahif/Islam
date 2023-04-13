import dayjs from 'dayjs';
import { Timings } from '../types/PrayerTimesResponse';
import { LocalNotifications } from '@capacitor/local-notifications';
import { NotificationsTypes } from 'config/notifications';
import { ObligatoryPrayers } from 'types/Prayers';

export function getNextPrayer(prayerTimes: Timings) {
  const now = dayjs();
  const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  let nextPrayerIndex = 0;

  for (let i = 0; i < prayerOrder.length; i++) {
    const prayerTime = dayjs(
      `${now.format('YYYY-MM-DD')} ${
        prayerTimes[prayerOrder[i] as keyof Timings]
      }`
    );

    if (prayerTime.isAfter(now)) {
      nextPrayerIndex = i;
      break;
    }
  }

  const nextPrayerName = prayerOrder[nextPrayerIndex];
  let nextPrayerTime = dayjs(
    `${now.format('YYYY-MM-DD')} ${
      prayerTimes[nextPrayerName as keyof Timings]
    }`
  );

  // if all prayers of today has passed, set fajr to tomorrow
  if (nextPrayerName === 'Fajr' && nextPrayerTime.isBefore(now)) {
    nextPrayerTime = nextPrayerTime.add(1, 'day');
  }

  return {
    name: nextPrayerName,
    time: nextPrayerTime.toDate(),
    readableTime: nextPrayerTime.format('h:mm A'),
  };
}

export function generatePrayerNotificationContent(
  currentPrayerName: ObligatoryPrayers
) {
  const titleMessages = [
    `It's ${currentPrayerName} time now!`,
    `The time for ${currentPrayerName} prayer has started!`,
    `Get ready to offer ${currentPrayerName} prayer!`,
    `It's time to pray ${currentPrayerName}!`,
    `Don't miss the ${currentPrayerName} prayer!`,
    `Remember to pray ${currentPrayerName} prayer now!`,
    `The ${currentPrayerName} prayer is due!`,
    `Start praying ${currentPrayerName} now!`,
    `Don't delay your ${currentPrayerName} prayer!`,
    `Get up and offer ${currentPrayerName} prayer now!`,
    `It's time to focus on ${currentPrayerName} prayer!`,
    `Prepare yourself for ${currentPrayerName} prayer!`,
    `It's time to connect with Allah through ${currentPrayerName} prayer!`,
    `The time for ${currentPrayerName} prayer has arrived!`,
    `Offer ${currentPrayerName} prayer on time!`,
    `Pray ${currentPrayerName} now and seek Allah's blessings!`,
    `Pray ${currentPrayerName} and feel the peace!`,
    `Get closer to Allah by praying ${currentPrayerName}!`,
    `Allah is calling you to pray ${currentPrayerName}!`,
    `Hayya ala salah! It's time for ${currentPrayerName} prayer!`,
    `Don't miss the opportunity to show gratitude and love to Allah through ${currentPrayerName} prayer!`,
    `Get ready to seek Allah's mercy through ${currentPrayerName} prayer!`,
    `${currentPrayerName} prayer: a reminder that Salat was made obligatory for all Muslims, whether rich or poor, strong or weak, black or white, male or female.`,
    `Remember to offer ${currentPrayerName} prayer and cultivate your soul's right to love and worship Allah.`,
    `Don't delay your ${currentPrayerName} prayer and miss out on the opportunity to connect with Allah.`,
    `It's time to focus on ${currentPrayerName} prayer and show your love and gratitude to Allah.`,
    `Prepare yourself for ${currentPrayerName} prayer and seek Allah's mercy and blessings.`,
    `It's time to connect with Allah through ${currentPrayerName} prayer and show your love and gratitude to Him.`,
    `Offer ${currentPrayerName} prayer on time and show your commitment to loving and worshiping Allah.`,
    `Let's offer ${currentPrayerName} prayer together and show our love and gratitude to Allah.`,
    `Pray ${currentPrayerName} and feel the peace and tranquility that comes with connecting to Allah.`,
  ];

  const bodyMessages = [
    `Take a deep breath and clear your mind. It's time to focus only on ${currentPrayerName} prayer and connect with Allah.`,
    `Amidst the distractions of daily life, ${currentPrayerName} prayer is a moment to pause and reflect on Allah's blessings. Don't let it slip by.`,
    `Close your eyes and take a moment to calm your mind. With ${currentPrayerName} prayer, it's an opportunity to reset your priorities and connect with Allah.`,
    `With ${currentPrayerName} prayer, let go of your worries and place your trust in Allah's infinite mercy and guidance.`,
    `As you begin your ${currentPrayerName} prayer, remind yourself that nothing else matters except for your connection with Allah.`,
    `As you offer your ${currentPrayerName} prayer, feel the weight of the world lift off your shoulders and bask in Allah's love and protection.`,
    `Let go of your worldly concerns and focus solely on your connection with Allah through ${currentPrayerName} prayer.`,
    `Use your ${currentPrayerName} prayer as a time to detach from the hustle and bustle of daily life and focus on the tranquility of Allah's presence.`,
    `Take a moment to express gratitude for all the blessings in your life, and offer thanks to Allah through your ${currentPrayerName} prayer.`,
    `Reflect on the greatness of Allah and submit yourself completely to your Lord through ${currentPrayerName} prayer.`,
    `Let your ${currentPrayerName} prayer be a moment of deep connection and surrender to Allah's infinite wisdom and mercy.`,
    `Use your ${currentPrayerName} prayer as an opportunity to seek forgiveness for any shortcomings or mistakes, and renew your commitment to living a righteous life.`,
    `Allow your ${currentPrayerName} prayer to be a source of peace and tranquility, helping you to let go of worries and anxieties that distract you.`,
    `Focus your mind and heart on the beauty and majesty of Allah, and offer heartfelt praise and adoration through your ${currentPrayerName} prayer.`,
    `Approach your ${currentPrayerName} prayer with a spirit of humility and reverence, recognizing your own smallness in the face of Allah's infinite power and grace.`,
    `Let your ${currentPrayerName} prayer be a moment of deep reflection and introspection, helping you to gain clarity and insight into your own path and purpose.`,
    `Use your ${currentPrayerName} prayer as a time to cultivate a deeper sense of presence and mindfulness, bringing your attention fully into the here and now.`,
    `Allow your ${currentPrayerName} prayer to be a powerful reminder of the sacredness of life and the importance of living each moment with intention and purpose.`,
    `Take a deep breath and clear your mind. Allah is calling you to pray ${currentPrayerName}. Hayya 'ala al-salah, hayya 'ala al-falah! Show your gratitude and love to Allah by fulfilling this important obligation.`,
    `Amidst the distractions of daily life, ${currentPrayerName} prayer is a moment to pause and reflect on Allah's blessings. Don't let it slip by. Get Allah's mercy and blessings by performing this act of worship.`,
    `Close your eyes and take a moment to calm your mind. With ${currentPrayerName} prayer, it's an opportunity to reset your priorities and connect with Allah. Show your love and devotion to Him by fulfilling this important duty.`,
    `With ${currentPrayerName} prayer, let go of your worries and place your trust in Allah's infinite mercy and guidance. Remember, prayer was made obligatory for all Muslims, whether they be rich or poor, strong or weak, black or white, male or female. Fulfilling this obligation allows you to enrich your spirituality and cultivate your soul's right to love and worship the Creator, Allah.`,
    `As you begin your ${currentPrayerName} prayer, remind yourself that nothing else matters except for your connection with Allah. Use this opportunity to show your gratitude, seek forgiveness, and renew your commitment to living a righteous life.`,
    `As you offer your ${currentPrayerName} prayer, feel the weight of the world lift off your shoulders and bask in Allah's love and protection. Allow this act of worship to nourish your soul and provide you with the peace and tranquility you seek.`,
    `Let go of your worldly concerns and focus solely on your connection with Allah through ${currentPrayerName} prayer. This is your chance to seek His forgiveness, His guidance, and His love.`,
    `Use your ${currentPrayerName} prayer as a time to detach from the hustle and bustle of daily life and focus on the tranquility of Allah's presence. This is your moment to immerse yourself in worship and experience the beauty of Islam.`,
    `As you offer your ${currentPrayerName} prayer, remember that you are not alone. Millions of Muslims around the world are also praying, and Allah is always with you. Let this knowledge provide you with comfort and support.`,
    `Take a moment to express gratitude for all the blessings in your life, and offer thanks to Allah through your ${currentPrayerName} prayer. Show your appreciation for His mercy, His guidance, and His love.`,
  ];

  const body = bodyMessages[Math.floor(Math.random() * bodyMessages.length)];
  const title = titleMessages[Math.floor(Math.random() * titleMessages.length)];

  return {
    title,
    body,
  };
}

export async function updatePrayerNotifications(prayerTimings: Timings) {
  const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  // clear any pending notifications using 'extra.type' === 'prayer-notification'
  const pending = await LocalNotifications.getPending();
  const pendingPrayerNotifications = pending.notifications.filter(
    (notification) => notification.extra.type === 'prayer-notification'
  );

  LocalNotifications.cancel({
    notifications: pendingPrayerNotifications,
  });

  const prayerNotifications = prayerNames.map(async (prayerName, indx) => {
    const { body, title } = generatePrayerNotificationContent(
      prayerName as any
    );
    const time = dayjs(prayerTimings[prayerName as keyof Timings], 'HH:mm');

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          largeBody: body,
          id: time.unix(),
          schedule: {
            at: time.toDate(),
            allowWhileIdle: true,
            every: 'day',
          },
          extra: {
            type: NotificationsTypes.PRAYER_NOTIFICATION,
            prayerName,
          },
        },
      ],
    });
  });

  return prayerNotifications;
}
