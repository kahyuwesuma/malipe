"use client";
import { useState } from "react";
import { MapPin, Mail, Globe, Send, User, MessageSquare, Phone, Clock, Leaf } from "lucide-react";

// Mock useAutoTranslate hook for demo
const useAutoTranslate = (text) => text;

// Mock Button component
const Button = ({ children, className, type, ...props }) => (
  <button
    type={type}
    className={`inline-flex items-center justify-center px-6 py-3 text-base font-AktivGrotesk-Regular rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const OurContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const contactInfo = [
    {
      icon: MapPin,
      title: useAutoTranslate("Alamat Kantor"),
      content: [
        "AKB. Sanipah 1 Gang. 3 No. 30 RT. 19",
        "Kel. Bugis, Kec. Tanjung Redeb",
        "Kabupaten Berau, Kalimantan Timur",
        "Indonesia",
      ],
      color: "from-emerald-100 to-green-100",
      iconBg: "bg-emerald-500",
    },
    {
      icon: Mail,
      title: useAutoTranslate("Email Kami"),
      content: ["Malipemaratuapedulipenyu@gmail.com"],
      action: "mailto:Malipemaratuapedulipenyu@gmail.com",
      color: "from-blue-100 to-cyan-100",
      iconBg: "bg-blue-500",
    },
    {
      icon: Globe,
      title: "Website",
      content: ["malipe.com"],
      action: "https://malipe.com",
      color: "from-teal-100 to-blue-100",
      iconBg: "bg-teal-500",
    },
    {
      icon: Clock,
      title: useAutoTranslate("Jam Operasional"),
      content: ["Senin - Jumat: 08:00 - 17:00", "Sabtu: 08:00 - 14:00"],
      color: "from-orange-100 to-yellow-100",
      iconBg: "bg-orange-500",
    },
  ];

  const handleSubmit = (e) => {
    setIsSubmitting(true);
    // FormSubmit will handle the actual submission
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-teal-200/20 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 opacity-10 animate-pulse bg-white rounded-full"></div>
          <Leaf className="absolute bottom-10 left-10 w-24 h-24 opacity-10 animate-bounce" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <p className="text-xl sm:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-AktivGrotesk-Regular">
              {useAutoTranslate(
                "Bergabunglah dengan misi kami dalam melestarikan keindahan alam Indonesia. Mari bersama-sama menjaga ekosistem laut dan darat untuk generasi mendatang."
              )}
            </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div className="text-center lg:text-left mb-8">
              <h2 className="text-3xl font-AktivGrotesk-Regular text-gray-900 mb-4">
                {useAutoTranslate("Informasi Kontak")}
              </h2>
              <p className="text-gray-600 text-lg">
                Temukan berbagai cara untuk terhubung dengan kami
              </p>
            </div>

            <div className="space-y-6 font-AktivGrotesk-Regular">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    <div className="relative p-6 flex items-start gap-4">
                      <div className={`flex-shrink-0 w-14 h-14 ${info.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-AktivGrotesk-Regular text-gray-900 mb-2 text-lg group-hover:text-gray-800 transition-colors">
                          {info.title}
                        </h3>
                        <div className="text-gray-600 group-hover:text-gray-700 transition-colors">
                          {info.content.map((line, idx) => (
                            <div key={idx} className="mb-1 last:mb-0">
                              {info.action ? (
                                <a
                                  href={info.action}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-teal-600 hover:text-teal-800 hover:underline transition-colors duration-200 font-AktivGrotesk-Regular"
                                >
                                  {line}
                                </a>
                              ) : (
                                <span className="text-gray-700">{line}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-bl-full"></div>
              
              <div className="relative mb-8">
                <h2 className="text-3xl font-AktivGrotesk-Regular text-gray-900 mb-3">
                  {useAutoTranslate("Kirim Pesan")}
                </h2>
                <p className="text-gray-600 text-lg font-AktivGrotesk-Regular">
                  {useAutoTranslate("Kami akan merespon dalam waktu 24 jam")}
                </p>
              </div>

              <div
                action="https://formsubmit.co/Malipemaratuapedulipenyu@gmail.com"
                onSubmit={handleSubmit}
                className="space-y-6 relative"
              >
                <input type="hidden" name="_subject" value="Pesan Baru dari Formulir Kontak" />
                <input type="hidden" name="_captcha" value="false" />

                {/* Name Field */}
                <div className="space-y-2 font-AktivGrotesk-Regular">
                  <label htmlFor="name" className="block text-sm  text-gray-700">
                    {useAutoTranslate("Nama Lengkap")} *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'name' ? 'text-teal-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder={useAutoTranslate("Masukkan nama lengkap Anda")}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 text-gray-900 placeholder-gray-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2 font-AktivGrotesk-Regular">
                  <label htmlFor="email" className="block text-sm text-gray-700">
                    {useAutoTranslate("Email Anda")} *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'email' ? 'text-teal-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder={useAutoTranslate("nama@email.com")}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 text-gray-900 placeholder-gray-500 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2 font-AktivGrotesk-Regular">
                  <label htmlFor="subject" className="block text-sm text-gray-700">
                    {useAutoTranslate("Subjek")} *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={useAutoTranslate("Topik pesan Anda")}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 text-gray-900 placeholder-gray-500 transition-all duration-200"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2 font-AktivGrotesk-Regular">
                  <label htmlFor="message" className="block text-sm text-gray-700">
                    {useAutoTranslate("Pesan")} *
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-200 ${
                      focusedField === 'message' ? 'text-teal-500' : 'text-gray-400'
                    }`} />
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder={useAutoTranslate("Tulis pesan Anda di sini...")}
                      className="w-full min-h-[160px] pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 text-gray-900 placeholder-gray-500 resize-y transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl font-AktivGrotesk-Regular text-lg transition-all duration-200 transform hover:scale-105 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-600 hover:to-teal-400 text-white shadow-lg hover:shadow-2xl focus:ring-4 focus:ring-teal-500/50'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {useAutoTranslate("Kirim Pesan")}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16">
          <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-teal-400 rounded-3xl shadow-2xl p-8 sm:p-12 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                <Leaf className="w-5 h-5" />
                <span className="font-AktivGrotesk-Regular">Dukung Konservasi</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-AktivGrotesk-Regular mb-6">
                {useAutoTranslate("Bersama Menjaga Warisan Alam Indonesia")}
              </h3>
              
              <p className="text-lg sm:text-xl text-blue-100 max-w-4xl mx-auto mb-4 leading-relaxed font-AktivGrotesk-Regular">
                {useAutoTranslate("Setiap kontribusi Anda langsung mendukung rangers dan masyarakat lokal yang bekerja di garis depan untuk melindungi ekosistem laut dan spesies yang terancam punah.")}
              </p>
              
              <p className="text-blue-200 mb-8 text-lg font-AktivGrotesk-Regular">
                Mari bergabung dalam misi penting ini untuk masa depan yang berkelanjutan.
              </p>
              
              <Button className="bg-white text-teal-600 hover:bg-blue-50 hover:text-teal-700 font-AktivGrotesk-Regular py-4 px-10 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                <a href="/donasi" className="flex items-center gap-3">
                  {useAutoTranslate("Donasi Sekarang")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OurContact;