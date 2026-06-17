'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  VolumeX,
  ChevronRight,
  Heart,
  MapPin,
  Clock,
  Calendar,
  Navigation,
  Sparkles,
  BookOpen,
  Send,
  Check,
  Copy,
} from 'react-icons/fa6';
import { weddingConfig } from '../config/weddingConfig';
import { calculateTimeLeft, formatDate } from '../utils/countdown';
import { formatWishWithAI } from '../utils/aiWishFormatter';
import { TimeLeft, Guest } from '../types';

export function WeddingInvitation() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // RSVP Form States
  const [guestName, setGuestName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'tidak_hadir' | ''>('');
  const [guestCount, setGuestCount] = useState('1');
  const [rawWish, setRawWish] = useState('');
  const [formattedWish, setFormattedWish] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [wishesList, setWishesList] = useState<Guest[]>([
    {
      name: 'Contoh Tamu 1',
      status: 'hadir',
      count: 2,
      wish: 'Selamat ya! Semoga awet terus sampai kakek nenek. Sukses untuk pernikahannya!',
      date: '12 Nov 2026',
      formatted: true,
    },
    {
      name: 'Contoh Tamu 2',
      status: 'hadir',
      count: 1,
      wish: 'Semoga pernikahan ini menjadi awal yang indah untuk masa depan yang penuh berkah.',
      date: '11 Nov 2026',
      formatted: false,
    },
  ]);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(weddingConfig.wedding.date));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-play music after opening
  useEffect(() => {
    if (isOpened && audioRef.current && !isMuted) {
      audioRef.current.play().catch(() => {
        console.log('Autoplay prevented by browser');
      });
    }
  }, [isOpened, isMuted]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {
          console.log('Autoplay prevented');
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  const formatWishWithAIHandler = async (wish: string) => {
    if (!wish.trim()) return;
    setIsFormatting(true);
    try {
      const formatted = await formatWishWithAI(wish);
      setFormattedWish(formatted);
    } catch (error) {
      console.error('Error formatting wish:', error);
      setFormattedWish('');
    } finally {
      setIsFormatting(false);
    }
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !rsvpStatus) return;

    const newGuest: Guest = {
      name: guestName,
      status: rsvpStatus as 'hadir' | 'tidak_hadir',
      count: parseInt(guestCount),
      wish: formattedWish || rawWish,
      formatted: !!formattedWish,
      date: formatDate(new Date()),
    };

    setWishesList([newGuest, ...wishesList]);
    setIsSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setGuestName('');
      setRsvpStatus('');
      setGuestCount('1');
      setRawWish('');
      setFormattedWish('');
      setIsSubmitted(false);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-cream-50">
      {/* Background Music Player (Hidden) */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
        muted={isMuted}
      />

      {/* FLOATING AUDIO TOGGLE */}
      {isOpened && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 p-3.5 bg-white/80 backdrop-blur-md text-brown-500 rounded-full shadow-lg border border-cream-400 hover:bg-cream-200 transition-all duration-300"
          aria-label="Toggle Music"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Music className="w-5 h-5 animate-pulse" />
          )}
        </button>
      )}

      {/* 1. COVER / ENVELOPE SECTION (SPLASH) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-cream-50 to-cream-100 px-6 text-center"
          >
            {/* Dekorasi Bingkai Elegan */}
            <div className="absolute inset-10 border border-cream-600/40 pointer-events-none rounded-sm" />
            <div className="absolute inset-12 border border-cream-600/20 pointer-events-none rounded-sm" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6 max-w-lg z-10"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-cream-900 font-medium block">
                The Wedding of
              </span>
              <h1 className="text-5xl md:text-6xl font-serif text-brown-600 italic font-light tracking-wide">
                Baskara{' '}
                <span className="text-3xl font-sans not-italic font-extralight block my-2 text-cream-800">
                  &
                </span>{' '}
                Kirana
              </h1>
              <p className="text-sm text-cream-900 tracking-widest uppercase pt-2">12 . 12 . 2026</p>

              <div className="h-[1px] w-16 bg-cream-600 mx-auto my-6" />

              <div className="bg-cream-50/60 backdrop-blur-sm border border-cream-500 py-4 px-6 rounded-md shadow-sm">
                <p className="text-xs text-cream-900 italic">Kepada Bapak/Ibu/Saudara/i:</p>
                <p className="text-base font-medium text-brown-600 mt-1">Tamu Undangan Spesial</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOpenInvitation}
                className="mt-6 inline-flex items-center gap-2 bg-brown-500 hover:bg-brown-600 text-cream-50 text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              >
                Buka Undangan
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      {isOpened && (
        <div className="relative">
          {/* 2. HERO SECTION */}
          <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            {/* Background Ornamen */}
            <div className="absolute inset-0 bg-[radial-gradient(#EDE8DF_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />

            {/* Dekorasi */}
            <div className="absolute top-10 left-10 w-32 h-32 border-t border-l border-cream-600/30 pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border-b border-r border-cream-600/30 pointer-events-none" />

            <div className="text-center space-y-8 max-w-3xl relative z-10 px-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-cream-900 block font-semibold">
                  Maha Suci Allah SWT yang telah mempersatukan
                </span>
                <div className="h-[1px] w-12 bg-cream-600/60 mx-auto my-4" />

                <h2 className="text-6xl md:text-8xl font-serif text-brown-600 font-light tracking-wide italic leading-tight">
                  Baskara <br className="md:hidden" />
                  <span className="font-sans not-italic text-3xl md:text-4xl text-cream-800 mx-4 font-light">
                    &
                  </span>
                  Kirana
                </h2>

                <p className="text-sm text-cream-900 tracking-[0.25em] font-light uppercase pt-4">
                  SABTU, 12 DESEMBER 2026 • JAKARTA
                </p>
              </motion.div>

              {/* Scroll Down Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="pt-12 text-xs uppercase tracking-[0.3em] text-cream-700 flex flex-col items-center gap-2"
              >
                <span>Gulir ke bawah</span>
                <div className="w-[1px] h-10 bg-cream-600" />
              </motion.div>
            </div>
          </section>

          {/* 3. PROFIL MEMPELAI */}
          <section className="py-24 bg-cream-100 relative border-y border-cream-400">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center space-y-4 mb-16">
                <Heart className="w-5 h-5 text-cream-800 mx-auto animate-pulse" />
                <h3 className="text-2xl md:text-3xl font-serif text-brown-600 italic">
                  Kedua Mempelai
                </h3>
                <p className="text-sm text-cream-900 max-w-md mx-auto leading-relaxed">
                  "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-16 items-center">
                {/* MEMPELAI PRIA */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center space-y-4"
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-tr from-cream-500 to-cream-300 p-1 shadow-sm">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center border border-cream-500">
                      <span className="text-5xl">🤵🏻</span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-serif font-medium text-brown-600">
                    {weddingConfig.groom.name}, {weddingConfig.groom.title}
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-cream-800 font-semibold">Putra Pertama dari</p>
                  <p className="text-sm text-brown-400 leading-relaxed">
                    {weddingConfig.groom.father} <br /> & {weddingConfig.groom.mother}
                  </p>
                </motion.div>

                {/* MEMPELAI WANITA */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center space-y-4"
                >
                  <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-tr from-cream-500 to-cream-300 p-1 shadow-sm">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center border border-cream-500">
                      <span className="text-5xl">👰🏻</span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-serif font-medium text-brown-600">
                    {weddingConfig.bride.name}, {weddingConfig.bride.title}
                  </h4>
                  <p className="text-xs uppercase tracking-widest text-cream-800 font-semibold">Putri Kedua dari</p>
                  <p className="text-sm text-brown-400 leading-relaxed">
                    {weddingConfig.bride.father} <br /> & {weddingConfig.bride.mother}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* 4. COUNTDOWN TIMER */}
          <section className="py-20 relative bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(253, 251, 247, 0.95), rgba(253, 251, 247, 0.95))` }}>
            <div className="max-w-4xl mx-auto px-6 text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-cream-900 font-semibold mb-6 block">
                Menuju Hari Bahagia
              </span>

              <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-8">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="bg-white/80 backdrop-blur-sm border border-cream-500 p-4 rounded-lg shadow-sm">
                    <div className="text-3xl md:text-4xl font-serif text-brown-600 font-semibold">
                      {String(value).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] md:text-xs uppercase tracking-wider text-cream-800 mt-1">
                      {label === 'days'
                        ? 'Hari'
                        : label === 'hours'
                          ? 'Jam'
                          : label === 'minutes'
                            ? 'Menit'
                            : 'Detik'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 text-xs text-cream-900 bg-cream-300 px-4 py-2 rounded-full font-light">
                <Calendar className="w-3.5 h-3.5 text-cream-800" />
                {weddingConfig.wedding.dateFormatted}
              </div>
            </div>
          </section>

          {/* 5. ACARA & LOKASI DETAIL */}
          <section className="py-24 bg-cream-100 border-t border-cream-400">
            <div className="max-w-5xl mx-auto px-6">
              <div className="text-center space-y-4 mb-16">
                <MapPin className="w-5 h-5 text-cream-800 mx-auto" />
                <h3 className="text-2xl md:text-3xl font-serif text-brown-600 italic">Detail Acara & Lokasi</h3>
                <p className="text-sm text-cream-900">
                  Kami sangat menantikan kehadiran Anda di momen istimewa kami.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                {/* AKAD NIKAH */}
                <div className="bg-white border border-cream-400 p-8 rounded-xl shadow-sm space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center border border-cream-500">
                      <Heart className="w-4 h-4 text-cream-800" />
                    </div>
                    <h4 className="text-2xl font-serif text-brown-600">{weddingConfig.ceremony.name}</h4>
                    <div className="h-[1px] w-12 bg-cream-800" />
                    <div className="space-y-3 text-sm text-brown-400">
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-cream-800 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-brown-600">{weddingConfig.ceremony.time}</p>
                          <p className="text-xs">Diharapkan hadir tepat waktu</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-cream-800 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-brown-600">{weddingConfig.ceremony.location}</p>
                          <p className="text-xs leading-relaxed">{weddingConfig.ceremony.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={weddingConfig.ceremony.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-cream-100 hover:bg-cream-500 text-brown-500 text-xs uppercase tracking-wider rounded-md border border-cream-500 transition-all duration-300"
                  >
                    <Navigation className="w-4 h-4" />
                    Petunjuk Peta Akad
                  </a>
                </div>

                {/* RESEPSI */}
                <div className="bg-white border border-cream-400 p-8 rounded-xl shadow-sm space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center border border-cream-500">
                      <Sparkles className="w-4 h-4 text-cream-800" />
                    </div>
                    <h4 className="text-2xl font-serif text-brown-600">{weddingConfig.reception.name}</h4>
                    <div className="h-[1px] w-12 bg-cream-800" />
                    <div className="space-y-3 text-sm text-brown-400">
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-cream-800 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-brown-600">{weddingConfig.reception.time}</p>
                          <p className="text-xs">Sesi foto bersama & ramah tamah</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-cream-800 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-brown-600">{weddingConfig.reception.location}</p>
                          <p className="text-xs leading-relaxed">{weddingConfig.reception.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a
                    href={weddingConfig.reception.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-cream-100 hover:bg-cream-500 text-brown-500 text-xs uppercase tracking-wider rounded-md border border-cream-500 transition-all duration-300"
                  >
                    <Navigation className="w-4 h-4" />
                    Petunjuk Peta Resepsi
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 6. RSVP FORM & AI WISH FORMATTER */}
          <section className="py-24 bg-white relative">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center space-y-4 mb-16">
                <Sparkles className="w-6 h-6 text-cream-800 mx-auto animate-bounce" />
                <h3 className="text-3xl font-serif text-brown-600 italic">Konfirmasi Kehadiran</h3>
                <p className="text-sm text-cream-900 max-w-lg mx-auto">
                  Bantu kami mempersiapkan sambutan terbaik dengan mengonfirmasi kehadiran Anda serta titipkan doa restu terindah.
                </p>
              </div>

              <div className="bg-cream-100 border border-cream-400 p-8 rounded-2xl shadow-sm">
                <form onSubmit={handleSubmitRsvp} className="space-y-6">
                  {/* Nama Tamu */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-cream-900 mb-2 font-medium">
                      Nama Lengkap Anda
                    </label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Masukkan nama lengkap"
                      className="w-full px-4 py-3 bg-white border border-cream-500 rounded-lg text-sm text-brown-600 focus:outline-none focus:border-cream-800 focus:ring-1 focus:ring-cream-800 transition-colors"
                    />
                  </div>

                  {/* Status Kehadiran */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('hadir')}
                      className={`py-3 px-4 rounded-lg text-xs uppercase tracking-wider font-semibold border transition-all ${
                        rsvpStatus === 'hadir'
                          ? 'bg-brown-500 text-white border-transparent'
                          : 'bg-white text-brown-400 border-cream-400'
                      }`}
                    >
                      Saya Akan Hadir
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpStatus('tidak_hadir')}
                      className={`py-3 px-4 rounded-lg text-xs uppercase tracking-wider font-semibold border transition-all ${
                        rsvpStatus === 'tidak_hadir'
                          ? 'bg-brown-500 text-white border-transparent'
                          : 'bg-white text-brown-400 border-cream-400'
                      }`}
                    >
                      Maaf, Berhalangan
                    </button>
                  </div>

                  {/* Jumlah Tamu */}
                  {rsvpStatus === 'hadir' && (
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream-900 mb-2 font-medium">
                        Jumlah Pax
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-cream-500 rounded-lg text-sm text-brown-600 focus:outline-none focus:border-cream-800 focus:ring-1 focus:ring-cream-800 transition-colors"
                      >
                        <option value="1">1 Orang</option>
                        <option value="2">2 Orang (Maksimal)</option>
                      </select>
                    </div>
                  )}

                  {/* AI Wish Formatter Box */}
                  <div className="border border-cream-400/60 bg-white p-5 rounded-xl space-y-4 shadow-sm relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-cream-900 font-semibold flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-cream-800" />
                        Tulis Ucapan Selamat
                      </span>
                      <span className="text-[10px] bg-cream-800/10 text-brown-400 font-medium px-2 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-cream-800" /> AI Beautifier Active
                      </span>
                    </div>

                    <textarea
                      rows={3}
                      value={rawWish}
                      onChange={(e) => setRawWish(e.target.value)}
                      placeholder="Contoh: Selamat ya bro! semoga awet terus sampe kakek nenek..."
                      className="w-full p-4 bg-cream-100 border border-cream-400 rounded-lg text-sm text-brown-600 focus:outline-none focus:border-cream-800 focus:ring-1 focus:ring-cream-800 transition-colors placeholder:text-gray-400"
                    />

                    {/* Button to Trigger AI Formatting */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => formatWishWithAIHandler(rawWish)}
                        disabled={!rawWish.trim() || isFormatting}
                        className="inline-flex items-center gap-2 py-2 px-4 bg-cream-100 border border-cream-500 hover:border-cream-800 hover:bg-cream-300 rounded-lg text-xs font-semibold text-brown-500 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300"
                      >
                        {isFormatting ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-cream-800 border-t-transparent rounded-full animate-spin" />
                            Menggubah Kalimat...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5 text-cream-800" />
                            Gubah Jadi Puitis & Indah (AI)
                          </>
                        )}
                      </button>
                    </div>

                    {/* Hasil AI Preview */}
                    <AnimatePresence>
                      {formattedWish && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-gradient-to-r from-cream-100 to-cream-200 border-l-2 border-cream-800 p-4 rounded-r-lg space-y-1"
                        >
                          <p className="text-[10px] font-semibold text-cream-800 uppercase tracking-wider flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-cream-800" /> Gubahan AI Puitis Anda:
                          </p>
                          <p className="text-sm italic text-brown-600 leading-relaxed">
                            "{formattedWish}"
                          </p>
                          <button
                            type="button"
                            onClick={() => setFormattedWish('')}
                            className="text-[10px] text-red-500 hover:underline pt-1 block"
                          >
                            Gunakan ucapan asli saya
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitted || !guestName.trim()}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 bg-brown-500 hover:bg-brown-600 text-white text-xs uppercase tracking-wider font-semibold rounded-lg disabled:opacity-40 transition-colors"
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="w-4 h-4" /> RSVP Berhasil Dikirim
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Kirim RSVP & Ucapan
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* WISHLIST TAMPILAN TAMU */}
              <div className="mt-16 space-y-6">
                <h4 className="text-lg font-serif text-brown-600 border-b border-cream-400 pb-3 flex items-center gap-2">
                  <span>Untaian Doa Tamu Undangan</span>
                  <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-cream-200 text-brown-400 font-semibold">
                    {wishesList.length} Doa
                  </span>
                </h4>

                <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
                  {wishesList.map((wish, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-cream-100 border border-cream-400/60 p-5 rounded-xl space-y-2 relative"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-brown-600 flex items-center gap-2">
                          {wish.name}
                          {wish.status === 'hadir' ? (
                            <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold uppercase tracking-wider">
                              Hadir
                            </span>
                          ) : (
                            <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold uppercase tracking-wider">
                              Berhalangan
                            </span>
                          )}
                        </p>
                        <span className="text-[10px] text-cream-700">{wish.date}</span>
                      </div>

                      <p className="text-sm text-brown-400 leading-relaxed italic">
                        "{wish.wish}"
                      </p>

                      {wish.formatted && (
                        <span className="absolute bottom-2 right-4 text-[9px] text-cream-800 font-semibold tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> Gubahan AI Sastra
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7. GIFT & ANGPAU DIGITAL */}
          <section className="py-24 bg-cream-100 border-t border-cream-400">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="space-y-4 mb-16">
                <Heart className="w-5 h-5 text-cream-800 mx-auto" />
                <h3 className="text-2xl md:text-3xl font-serif text-brown-600 italic">Kado Digital</h3>
                <p className="text-sm text-cream-900 max-w-lg mx-auto">
                  Doa restu Anda merupakan kado terindah bagi kami. Namun jika Anda ingin mengirimkan tanda kasih, Anda dapat menyalurkannya melalui rekening di bawah ini.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {weddingConfig.giftBanks.map((bank, index) => (
                  <div key={index} className="bg-white border border-cream-400 p-8 rounded-xl shadow-sm space-y-4 text-center">
                    <div className={`text-xl font-bold tracking-widest ${
                      bank.color === 'blue' ? 'text-blue-600' : 'text-emerald-600'
                    }`}>
                      {bank.bank}
                    </div>
                    <div>
                      <p className="text-xs text-cream-900 uppercase tracking-wider">No. Rekening</p>
                      <p className="text-lg font-serif font-semibold text-brown-600 my-1">{bank.accountNumber}</p>
                      <p className="text-xs text-brown-400">a/n {bank.accountHolder}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(bank.accountNumber)}
                      className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-cream-100 hover:bg-cream-500 text-brown-500 rounded border border-cream-400 transition-all"
                    >
                      <Copy className="w-3.5 h-3.5" /> Salin No. Rekening
                    </button>
                  </div>
                ))}
              </div>

              {/* Toast Copy Success */}
              <AnimatePresence>
                {copySuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-brown-500 text-white px-4 py-2 rounded-md text-xs tracking-wider uppercase z-50 shadow-md"
                  >
                    Nomor Rekening Berhasil Disalin!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* 8. FOOTER */}
          <footer className="py-16 bg-brown-500 text-white/90 text-center relative">
            <div className="absolute inset-x-0 top-0 h-[1px] bg-cream-400/20" />
            <div className="max-w-md mx-auto px-6 space-y-6">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                Merupakan Suatu Kebahagiaan & Kehormatan Bagi Kami
              </p>
              <h4 className="text-3xl font-serif italic font-light tracking-wide">
                Baskara & Kirana
              </h4>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Terima kasih atas segala doa restu, ucapan selamat, dan kehadiran yang begitu hangat dari Bapak/Ibu/Saudara/i sekalian. Sampai jumpa di hari bahagia kami.
              </p>
              <div className="h-[1px] w-12 bg-white/30 mx-auto" />
              <p className="text-[10px] text-white/40 tracking-widest uppercase">
                Created with 💕 & Gemini AI Wish Formatter
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
