import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            دستیار هوشمند زیمر
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            تجربه‌ای متفاوت با رابط کاربری پیشرفته و قابلیت تغییر تم. 
            دستیار هوشمند شما با طراحی مدرن و آموزشی آماده خدمت‌رسانی است.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="educational-card p-6 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-professional rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">عملکرد سریع</h3>
            <p className="text-gray-600">بهینه‌سازی شده برای پاسخ‌دهی سریع و کارآمد</p>
          </div>

          <div className="educational-card p-6 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-nature rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">تم‌های متنوع</h3>
            <p className="text-gray-600">انتخاب از بین ۶ تم زیبا و حرفه‌ای</p>
          </div>

          <div className="educational-card p-6 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-sophisticated rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">طراحی مدرن</h3>
            <p className="text-gray-600">رابط کاربری پیشرفته با افکت‌های بصری جذاب</p>
          </div>
        </div>

        {/* Theme Showcase */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">تم‌های موجود</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'حرفه‌ای', gradient: 'bg-gradient-professional', desc: 'مناسب محیط‌های کاری' },
              { name: 'طبیعت', gradient: 'bg-gradient-nature', desc: 'آرامش‌بخش و سبز' },
              { name: 'غروب آفتاب', gradient: 'bg-gradient-sunset', desc: 'گرم و دوستانه' },
              { name: 'اقیانوس', gradient: 'bg-gradient-ocean', desc: 'عمیق و قابل اعتماد' },
              { name: 'جنگل', gradient: 'bg-gradient-forest', desc: 'طبیعی و سالم' },
              { name: 'مدرن', gradient: 'bg-gradient-sophisticated', desc: 'شیک و پیشرفته' },
            ].map((theme, index) => (
              <div key={index} className="educational-card p-6 rounded-2xl text-center">
                <div className={`w-16 h-16 ${theme.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{theme.name}</h3>
                <p className="text-gray-600 text-sm">{theme.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <div className="educational-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">نحوه استفاده</h3>
            <div className="space-y-4 text-right">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-professional rounded-full flex items-center justify-center text-white font-bold">۱</div>
                <p className="text-gray-700">روی دکمه چت در گوشه سمت چپ کلیک کنید</p>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-nature rounded-full flex items-center justify-center text-white font-bold">۲</div>
                <p className="text-gray-700">برای تغییر تم، روی آیکون تنظیمات کلیک کنید</p>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-sophisticated rounded-full flex items-center justify-center text-white font-bold">۳</div>
                <p className="text-gray-700">پیام خود را تایپ کرده و ارسال کنید</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </main>
  )
} 