import ChatWidget from '@/components/ChatWidget'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-vazir">
            چت بات هوشمند
          </h1>
          <p className="text-lg text-gray-600 font-vazir">
            با استفاده از هوش مصنوعی و پایگاه دانش سفارشی
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-vazir">
              ویژگی‌ها
            </h2>
            <ul className="space-y-2 text-gray-600 font-vazir">
              <li>• پاسخ‌های سریع و دقیق</li>
              <li>• پشتیبانی از زبان فارسی</li>
              <li>• پایگاه دانش سفارشی</li>
              <li>• هوش مصنوعی پیشرفته</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 font-vazir">
              نحوه استفاده
            </h2>
            <ul className="space-y-2 text-gray-600 font-vazir">
              <li>• روی دکمه چت کلیک کنید</li>
              <li>• سوال خود را بنویسید</li>
              <li>• پاسخ فوری دریافت کنید</li>
              <li>• در صورت نیاز، سوال را دوباره بپرسید</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-vazir">
            آماده شروع گفتگو هستید؟
          </h2>
          <p className="text-gray-600 mb-6 font-vazir">
            چت بات ما در گوشه سمت چپ صفحه آماده پاسخگویی به سوالات شماست.
          </p>
          <div className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-vazir">
            روی دکمه چت کلیک کنید
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </main>
  )
} 