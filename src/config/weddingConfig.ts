export const weddingConfig = {
  groom: {
    name: 'Baskara Adi Pratama',
    title: 'S.T.',
    emoji: '🤵🏻‍♂️',
    father: 'Ir. H. Hermawan Pratama',
    mother: 'Ibu Hj. Sinta Maheswari',
  },
  bride: {
    name: 'Kirana Larasati',
    title: 'M.Psi.',
    emoji: '👰🏻‍♀️',
    father: 'Dr. H. Setiawan Laksana',
    mother: 'Ibu Hj. Amalia Kusuma',
  },
  wedding: {
    date: '2026-12-12',
    location: 'Jakarta',
    dateFormatted: 'Sabtu, 12 Desember 2026',
  },
  ceremony: {
    name: 'Akad Nikah',
    time: '08:00 - 10:00 WIB',
    location: 'Masjid Raya At-Tin',
    address: 'Jl. Raya Taman Mini, Pinang Ranti, Kec. Makasar, Kota Jakarta Timur',
    mapsLink: 'https://maps.google.com/maps/search/Masjid+Raya+At-Tin+Jakarta',
  },
  reception: {
    name: 'Resepsi Pernikahan',
    time: '11:00 - 15:00 WIB',
    location: 'Gedung Sasana Kriya (Grand Ballroom)',
    address: 'Taman Mini Indonesia Indah (TMII), Jakarta Timur',
    mapsLink: 'https://maps.google.com/maps/search/Gedung+Sasana+Kriya+TMII+Jakarta',
  },
  giftBanks: [
    {
      bank: 'BCA',
      accountNumber: '8012345678',
      accountHolder: 'Baskara Adi Pratama',
      color: 'blue',
    },
    {
      bank: 'MANDIRI',
      accountNumber: '1230098765432',
      accountHolder: 'Kirana Larasati',
      color: 'emerald',
    },
  ],
};

export type WeddingConfig = typeof weddingConfig;
