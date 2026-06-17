# 💍 Invitation Wedding - Digital Wedding Invitation Platform

An elegant, responsive digital wedding invitation website built with React, TypeScript, and Framer Motion. Features AI-powered wish formatting, countdown timer, RSVP system, and more.

## ✨ Features

🎵 **Background Music Player** - Ambient music with toggle button

💌 **Envelope-Style Splash Screen** - Interactive opening animation

🤵👰 **Bride & Groom Profiles** - With family details and photos

⏱️ **Countdown Timer** - Days, hours, minutes, seconds to wedding

📍 **Event Details & Maps** - Ceremony and reception locations with Google Maps integration

📝 **RSVP Form** - Guest confirmation with attendance selection

✨ **AI Wish Formatter** - Converts casual messages to poetic Indonesian text using Google Gemini AI

💝 **Live Wishes Wall** - Display of guest wishes and congratulations

🏦 **Digital Gift Information** - Bank account details for monetary gifts

🎨 **Elegant Design** - Beige/cream color scheme with ornamental decorations

📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **AI Integration:** Google Generative AI (Gemini)
- **Build Tool:** Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm
- Google Generative AI API Key (free from [ai.google.dev](https://ai.google.dev))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fauziyahnr/Invitation_wedding.git
   cd Invitation_wedding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your Google API key:
   ```
   VITE_GOOGLE_API_KEY=your_actual_api_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   Opens at http://localhost:3000

5. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Configuration

Edit the following files to customize your invitation:

### `src/config/weddingConfig.ts`
```typescript
export const weddingConfig = {
  groom: {
    name: "Baskara Adi Pratama",
    title: "S.T.",
    father: "Ir. H. Hermawan Pratama",
    mother: "Ibu Hj. Sinta Maheswari",
  },
  bride: {
    name: "Kirana Larasati",
    title: "M.Psi.",
    father: "Dr. H. Setiawan Laksana",
    mother: "Ibu Hj. Amalia Kusuma",
  },
  wedding: {
    date: "2026-12-12",
    location: "Jakarta",
  },
  ceremony: {
    name: "Akad Nikah",
    time: "08:00 - 10:00 WIB",
    location: "Masjid Raya At-Tin",
    address: "Jl. Raya Taman Mini, Pinang Ranti, Kec. Makasar, Kota Jakarta Timur",
    mapsLink: "https://maps.google.com",
  },
  reception: {
    name: "Resepsi Pernikahan",
    time: "11:00 - 15:00 WIB",
    location: "Gedung Sasana Kriya (Grand Ballroom)",
    address: "Taman Mini Indonesia Indah (TMII), Jakarta Timur",
    mapsLink: "https://maps.google.com",
  },
  giftBanks: [
    {
      bank: "BCA",
      accountNumber: "8012345678",
      accountHolder: "Baskara Adi Pratama",
    },
    {
      bank: "MANDIRI",
      accountNumber: "1230098765432",
      accountHolder: "Kirana Larasati",
    },
  ],
};
```

### Music
Change the background music by updating the audio URL in `src/components/WeddingInvitation.tsx`:
```typescript
src="https://your-music-url.mp3"
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add environment variable `VITE_GOOGLE_API_KEY` in Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Build: `npm run build`
2. Connect to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable `VITE_GOOGLE_API_KEY`

### Deploy to GitHub Pages

1. Update `vite.config.ts` with your repo name
2. `npm run build`
3. Push to `gh-pages` branch

## 📱 Responsive Design

The invitation is fully responsive and optimized for:
- **Mobile** (320px - 640px)
- **Tablet** (641px - 1024px)
- **Desktop** (1025px+)

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  cream: { /* ... */ },
  brown: { /* ... */ },
}
```

### Fonts
Add custom fonts in `src/styles/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
```

## 🔐 Security Notes

- Never commit `.env.local` file
- Store API keys only in environment variables
- Use environment-specific keys for production
- Validate all user inputs on the backend (if implemented)

## 📞 Support

For issues or questions, please open an [issue on GitHub](https://github.com/fauziyahnr/Invitation_wedding/issues).

## 📄 License

MIT License - feel free to use this project for your wedding!

---

**Made with 💕 for your special day**
