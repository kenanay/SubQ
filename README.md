# SubQ Kurulum ve Çalıştırma Rehberi

SubQ; Vite ile paketlenen, verilerini tarayıcının yerel depolama alanında tutan ve PWA olarak kurulabilen istemci taraflı bir web uygulamasıdır. Uygulamanın çalışması için bir sunucu, veritabanı veya kullanıcı hesabı gerekmez.

## Sistem gereksinimleri

- Node.js 18 veya üzeri
- npm 9 veya üzeri
- Güncel bir Chromium, Safari veya Firefox tarayıcısı
- PWA kurulumu ve service worker kullanımı için güvenli bağlam:
  - Geliştirmede `localhost`
  - Gerçek cihazda HTTPS üzerinden yayınlanan bir adres

Bu doküman hazırlanırken kullanılan ortam:

```text
Node.js v22.22.0
npm 10.9.4
```

## Kurulum

Proje dizinine geçin:

```bash
cd /Users/asel/Documents/SubQ
```

Bağımlılıkları kilit dosyasındaki kesin sürümlerle kurun:

```bash
npm ci
```

`package-lock.json` bulunmayan bir kopyada alternatif olarak şu komut kullanılabilir:

```bash
npm install
```

## Uygulamayı başlatma seçenekleri

### 1. Geliştirme modu

```bash
npm run dev
```

Vite geliştirme sunucusu varsayılan olarak aşağıdaki adreste açılır:

```text
http://localhost:3000/
```

Bu mod:

- Kaynak dosyalardaki değişiklikleri anında tarayıcıya yansıtır.
- Geliştirme ve hızlı kontrol için uygundur.
- Üretim PWA davranışını doğrulamak için kullanılmamalıdır; kesin PWA testi üretim derlemesi üzerinden yapılmalıdır.

Sunucunun otomatik tarayıcı açması `vite.config.js` içindeki `server.open` ayarıyla kontrol edilir. Otomatik açılışı kapatmak için bu değeri `false` yapın.

### 2. Üretim derlemesi oluşturma

```bash
npm run build
```

Komut, dağıtıma hazır dosyaları `dist/` klasörüne üretir. Beklenen temel çıktı:

```text
dist/
├── assets/
├── icons/
├── index.html
├── manifest.webmanifest
├── registerSW.js
├── sw.js
└── workbox-*.js
```

Derlemede Vite, JavaScript ve CSS dosyalarına içerik hash'i ekler. `vite-plugin-pwa`, oluşan gerçek dosya adlarını Workbox önbellek listesine otomatik olarak dahil eder.

### 3. Üretim derlemesini yerelde çalıştırma

Önce derleme oluşturun, ardından önizleme sunucusunu başlatın:

```bash
npm run build
npm run preview
```

Varsayılan adres genellikle:

```text
http://localhost:4173/
```

Farklı bir port kullanmak için:

```bash
npm run preview -- --port 5000
```

Yerel ağdaki başka cihazlardan erişim açmak için:

```bash
npm run preview -- --host 0.0.0.0
```

Telefon üzerinden `http://BILGISAYAR_IP_ADRESI:4173` biçiminde erişim mümkün olsa da HTTP üzerinden açılan yerel ağ adresleri çoğu tarayıcıda güvenli bağlam sayılmaz. Bu durumda service worker veya PWA kurulumu çalışmayabilir. Gerçek telefon kurulumu için HTTPS kullanın.

## PWA kurulumu

### Android ve Chromium tabanlı tarayıcılar

1. Uygulamanın HTTPS adresini Chrome veya uyumlu bir tarayıcıda açın.
2. İlk yüklemenin ve service worker kurulumunun tamamlanmasını bekleyin.
3. Tarayıcı menüsünden **Uygulamayı yükle** veya **Ana ekrana ekle** seçeneğini seçin.
4. Kurulumdan sonra SubQ, ana ekran simgesinden bağımsız pencere olarak açılır.

### iPhone ve iPad

1. Uygulamanın HTTPS adresini Safari'de açın.
2. **Paylaş** düğmesine dokunun.
3. **Ana Ekrana Ekle** seçeneğini seçin.
4. Uygulamayı oluşturulan SubQ simgesinden açın.

### Çevrimdışı çalışmayı kontrol etme

1. Uygulamayı üretim sürümünde en az bir kez çevrimiçi açın.
2. Service worker ve önbellek kurulumunun tamamlanmasını bekleyin.
3. Uygulamayı kapatın veya sayfayı yenilemeye hazırlanın.
4. İnternet bağlantısını kesin.
5. Uygulamayı tekrar açın.

Service worker kurulumu tamamlanmadan bağlantı kesilirse gerekli dosyaların tamamı indirilemeyebilir.

## Paket bağımlılıkları

Projede çalışma zamanında indirilen bir UI kütüphanesi veya framework bulunmaz. Uygulama saf HTML, CSS ve JavaScript kullanır. `package.json` içindeki doğrudan geliştirme bağımlılıkları şunlardır:

| Paket | Tanımlanan sürüm | Kurulu sürüm | Görevi |
|---|---:|---:|---|
| `vite` | `^8.3.0` | `8.3.0` | Geliştirme sunucusu, modül paketleme ve üretim derlemesi |
| `vite-plugin-pwa` | `^1.3.0` | `1.3.0` | Web manifesti, service worker kaydı ve PWA üretimi |

### Dolaylı bağımlılıklar

`vite-plugin-pwa`, çevrimdışı önbellekleme ve service worker üretimi için Workbox paketlerini dolaylı olarak kullanır. Bunların sürümleri `package-lock.json` tarafından yönetilir; ayrıca elle kurulmaları gerekmez. Başlıca bileşenler:

- `workbox-build`
- `workbox-window`
- `workbox-precaching`
- `workbox-routing`
- `workbox-strategies`
- `workbox-core`

Vite ayrıca derleme için Rollup ve esbuild gibi kendi dolaylı bağımlılıklarını getirir. Dolaylı paketler doğrudan değiştirilmemeli; güncellemeler `vite` veya `vite-plugin-pwa` üzerinden yapılmalıdır.

Tüm kurulu üst seviye paketleri görmek için:

```bash
npm list --depth=0
```

Bağımlılık ağacının tamamını görmek için:

```bash
npm list
```

## Kullanılan tarayıcı API'leri

Aşağıdaki özellikler npm paketi değildir; doğrudan tarayıcı tarafından sağlanır:

- `localStorage`: niyet, günlük ve tema ayarlarını cihazda saklar.
- Cache API ve Service Worker API: PWA çevrimdışı dosya önbelleğini yönetir.
- Web Audio API: 432 Hz ortam sesini üretir.
- Canvas API: sembolik çizim alanını çalıştırır.
- FileReader, Blob ve Object URL API'leri: JSON yedeklerini içe ve dışa aktarır.

## Verilerin saklandığı yer

Kişisel veriler uzak bir sunucuya gönderilmez. Tarayıcının `localStorage` alanında şu anahtarlarla saklanır:

```text
subq_active_intention
subq_journal_entries
subq_user_settings
```

Tarayıcı verileri temizlenirse bu kayıtlar silinir. Düzenli olarak **Planlayıcı → Veri Yönetimi & Güvenli Yedekleme → Verileri Dışa Aktar** seçeneğiyle JSON yedeği alınması önerilir.

## Önemli proje dosyaları

```text
index.html                 Uygulama kabuğu
css/styles.css             Tüm görsel stiller ve temalar
js/main.js                 Uygulama başlangıç noktası
js/data.js                 Bilgi bankası ve beden haritası içeriği
js/modules/                Uygulama modülleri
public/icons/              PWA ikonları
vite.config.js             Vite ve PWA yapılandırması
package.json               Komutlar ve doğrudan bağımlılıklar
package-lock.json          Kesin paket sürümleri
dist/                      Üretim derlemesi; elle düzenlenmemelidir
```

## Sorun giderme

### Port 3000 kullanımda

Başka bir portla çalıştırın:

```bash
npm run dev -- --port 3001
```

### Bağımlılık kurulumu bozuk

Önce tekrar kurulumu deneyin:

```bash
npm ci
```

### PWA eski sürümü gösteriyor

Yeni üretim derlemesini dağıttıktan sonra uygulamayı çevrimiçi açıp yenileyin. `registerType: 'autoUpdate'` ve Workbox eski önbelleği otomatik olarak yeniler. Sorun sürerse tarayıcı geliştirici araçlarındaki Application/Storage bölümünden site verilerini temizleyip uygulamayı yeniden açın.

### PWA kurulum seçeneği görünmüyor

Şunları kontrol edin:

- Sayfa HTTPS veya `localhost` üzerinden açılıyor mu?
- `npm run build` başarıyla tamamlandı mı?
- Sunucu `dist/` klasörünü kök dizin olarak sunuyor mu?
- `manifest.webmanifest`, `sw.js` ve ikonlar HTTP 200 yanıtı veriyor mu?
- Tarayıcı PWA kurulumunu destekliyor mu?

## Hızlı doğrulama

Kurulumdan sonra temel teknik doğrulama:

```bash
npm ci
npm run build
npm run preview
```

Derleme çıktısında aşağıdakine benzer PWA bilgisi görülmelidir:

```text
PWA
mode      generateSW
precache  7 entries
files generated
  dist/sw.js
  dist/workbox-*.js
```
