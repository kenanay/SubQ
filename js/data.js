/**
 * SubQ Content & Theory Data Store
 * Sourced directly from Jean-Guillaume Salles interview & Biodecoding principles
 */

export const SUBQ_DATA = {
  about: {
    title: "SubQ Nedir?",
    tagline: "Alt Katman ve İçsel Keşif Yolculuğu",
    breakdown: [
      {
        letter: "Sub",
        subtitle: "Subconscious / Alt Katman (Kromanyon)",
        description: "Zihnimizin okyanusunun derinliklerini, karar ve biyolojik tepkilerimizin %80'ini yöneten hayatta kalma odaklı ilkel gücü temsil eder. Kelimelerden ziyade hisleri ve sembolleri anlar."
      },
      {
        letter: "Q",
        subtitle: "Query & Quest / Sorgu ve Keşif",
        description: "Bedenimizin verdiği fiziksel sinyallerin (semptomların) altındaki asıl duygusal kökeni 'sorgulamayı' ve kendi içsel şifamızı bulduğumuz 'keşif' yolculuğunu ifade eder."
      }
    ],
    principles: [
      "Tüm verileriniz yalnızca cihazınızın yerel hafızasında saklanır, %100 gizlidir.",
      "Kullanıcı girişi veya bulut senkronizasyonu gerektirmez.",
      "Geleneksel tıp ve terapi süreçlerini tamamlayıcı öz-farkındalık rehberidir."
    ]
  },

  articles: [
    {
      id: "filozof-ve-kromanyon",
      category: "Bilinç Dinamikleri",
      categorySlug: "bilinc",
      title: "Filozof ve Kromanyon: Zihnin İki Efendisi",
      readTime: "4 dk",
      summary: "Kararlarımızın ve sağlığımızın %80'ini yöneten ilkel bilinçdışı gücü (Kromanyon) ve mantıklı zihni (Filozof) anlamak.",
      sections: [
        {
          heading: "%80 Bilinçdışı Yönetimi",
          content: "Hayatımızın %80'i biyolojik, duygusal ve karar alma süreçleri dahil olmak üzere bilinçdışımız tarafından yönetilir. Mantıkla ne kadar çabalasak da derinlerdeki programlar devreye girer."
        },
        {
          heading: "Filozof vs. Kromanyon Benzetişimi",
          content: "Bilincimiz mantıklı, yavaş ama zeki bir 'Filozof' gibidir. Bilinçdışı ise tamamen hayatta kalmaya odaklı, kelimelerden anlamayan ama son derece güçlü bir 'Kromanyon' adamıdır. Kromanyon savaşmaz; tehlike sezinlediğinde bedeni ve duyguları anında harekete geçirir."
        },
        {
          heading: "Kromanyon'un Dilinden Konuşmak",
          content: "Bilinçdışımızı yok saymak veya onunla savaşmak yerine, onun dilinden konuşarak (semboller, somatik hisler, uyku öncesi niyetler) onunla müttefik olmamız gerekir."
        }
      ],
      quote: "Bilinçaltı entelektüel konuşmalardan anlamaz; görselleri, hisleri ve sembolleri anlar."
    },
    {
      id: "bedenin-dili",
      category: "Biyolojik Kod Çözme",
      categorySlug: "biyoloji",
      title: "Bedenin Dili: Hastalıklar Rastgele Değildir",
      readTime: "5 dk",
      summary: "Fiziksel rahatsızlıkların rastgele arızalar değil, aniden yaşanan duygusal şoklara verilen hayatta kalma adaptasyonları olduğu fikri.",
      sections: [
        {
          heading: "Duygusal Şok ve Biyolojik Adaptasyon",
          content: "Hastalıklar vücudun rastgele bir arızası değildir. Aniden yaşanan, dramatik olan, yalıtılmış (tek başına) hissedilen ve o an için çözümsüz görülen şoklara vücudun geliştirdiği biyolojik hayatta kalma adaptasyonlarıdır."
        },
        {
          heading: "Beden Pusulası",
          content: "Zihin yalan söyleyebilir veya olayları rasyonalize edebilir ama beden yalan söylemez. Bastırılmış duygular organlarda, kaslarda ve cildimizde biyolojik bir dil olarak somutlaşır."
        },
        {
          heading: "Tamamlayıcı Tıp Yaklaşımı",
          content: "Biodecoding ve duygu boşaltımı seansları, geleneksel tıbbi tedaviler (medikal, cerrahi, kemoterapi vb.) ile tamamen entegre ve tamamlayıcı şekilde yürütülmelidir."
        }
      ],
      quote: "Beden, bastırılmış duygunun nerede saklandığını gösteren şaşmaz bir pusuladır."
    },
    {
      id: "donguler-neden-tekrar-eder",
      category: "İlişkiler & Döngüler",
      categorySlug: "donguler",
      title: "Döngüler Neden Tekrar Eder? Sahneyi Yeniden Kurmak",
      readTime: "4 dk",
      summary: "İlişkilerde ve hayatta sürekli aynı toksik durumları yaşamanın ardındaki bilinçaltı radarı ve arketip seçimleri.",
      sections: [
        {
          heading: "Bilinçaltı Radarı",
          content: "Hayatımıza giren partnerleri biz değil, bizden önce bilinçaltımız seçer. Bilinçaltı, ailemizden (anne, baba, büyükanne vb.) öğrendiği referans kalıplarına uyan kişileri bir radar gibi tespit eder."
        },
        {
          heading: "Kurtarma ve Tekrar İhtiyacı",
          content: "Sürekli ulaşılamaz veya toksik partnerler bulmak bir şanssızlık değil; bilinçaltında çocuklukta yaşanan otorite/istismar figürlerini veya görülmeme duygusunu yeniden üreterek bu döngüyü çözmeye (kurtarmaya) çalışmaktır."
        },
        {
          heading: "Kısırdöngüyü Kırmak",
          content: "İlk adım, ilişkideki partneri suçlamayı bırakıp 'Bilinçaltım hangi çocukluk duygumu yeniden sahneye koyuyor?' sorusuyla kök olaya yönelmektir."
        }
      ],
      quote: "Bilinçaltı, çözülmemiş bir acıyı iyileştirmek için oyunu tekrar tekrar sahneye koyar."
    },
    {
      id: "bagimliliklar-ve-para",
      category: "Bağımlılık & Bolluk",
      categorySlug: "bolluk",
      title: "Bağımlılıkların ve Para Sorunlarının Kökleri",
      readTime: "6 dk",
      summary: "Sigara, alkol bağımlılıkları ile para kazanamama veya borç döngülerinin anne/baba arketipleri ve atasal sadakatle ilişkisi.",
      sections: [
        {
          heading: "Bağımlılıkların Biyolojik Mantığı",
          content: "Bağımlılıklar, bilinçdışının biyolojik bir çatışmayı veya duygusal boşluğu çözme girişimidir. Sigara; geçmişte boğulduğu, kişisel alanının ihlal edildiği travmalara yanıt olarak özgür nefes alma ihtiyacıdır. Alkol ise anne sevgisi (kan bağı) eksikliğini ikame etme veya hayattaki referans noktasını kaybetme şokuyla bağlantılıdır."
        },
        {
          heading: "Para, Bolluk ve Anne/Baba Arketipleri",
          content: "Para yaratma ve bolluk 'Anne arketipinin' (besleyen, veren) entegre edilip edilmediğiyle ilgilidir. Para kazanıp ay sonunu getirememek veya yatırım yapamamak ise refahı temsil eden 'Baba arketipinin' (inşa eden) eksikliğini gösterir."
        },
        {
          heading: "Kapanmayan Borçlar ve Atasal Sadakat",
          content: "Kapanmayan borçlar ve sürekli finansal krizler, sıklıkla kişinin atalarından gelen 'ödenmemiş bir bedeli' veya suçluluğu bilinçdışı bir sadakatle ödemeye çalışmasıyla açıklanır."
        }
      ],
      quote: "Bolluk anne sevgisiyle başlar, refah ise baba güveniyle inşa edilir."
    },
    {
      id: "atalardan-gelen-yukler",
      category: "Transgenerasyonel",
      categorySlug: "atalar",
      title: "Atalardan Gelen Yükler: Görünmez Sadakat",
      readTime: "4 dk",
      summary: "Nesiller arası aktarım (transgenerasyonel) ile taşınan çözülmemiş yaslar, suçluluklar ve kader tekrarları.",
      sections: [
        {
          heading: "Görünmez Aile Sadakati",
          content: "Farkında olmadan aile ağacımızda dışlanmış, haksızlığa uğramış veya erken ölmüş atalarımızın kaderini tekrar ederiz. Bilinçaltı 'Senin acını ben de çekiyorum' sadakatiyle çalışır."
        },
        {
          heading: "Atasal Mirası Özgürleştirmek",
          content: "Ataların yükü bize ait değildir. Onların acısını saygıyla onurlandırıp 'Bu sizin kaderinizdi, saygıyla eğiliyorum ama benim kendi yaşamım var' diyerek sembolik bağ kesme ritüeli yapılmalıdır."
        }
      ],
      quote: "Atalarının ödemediği bedeli ödemeyi bıraktığında, kendi hayatını yaşamaya başlarsın."
    },
    {
      id: "bastirilmis-duygularin-tespiti",
      category: "Terapi ve Yöntem",
      categorySlug: "yontem",
      title: "Bastırılmış Duyguları Tespit Etmek ve Kör Noktalar",
      readTime: "5 dk",
      summary: "Zihinsel analizin neden yetersiz kaldığı, bedensel tepkiler ve sezgisel sembollerle kök duyguya ulaşma teknikleri.",
      sections: [
        {
          heading: "Zihinsel Analizin Sınırı",
          content: "Bastırılmış duyguları 'Neden böyle hissediyorum?' diye mantık yürüterek bulamayız. Çünkü Kromanyon o anıyı dayanılmaz olduğu için karantinaya almıştır."
        },
        {
          heading: "Somatik Tespit (Beden Pusulası)",
          content: "Bir anı veya kişi düşünüldüğünde aniden ellerin terlemesi, göğüste baskı, nefes darlığı veya boğazda düğümlenme bastırılmış duygunun kilidinin açıldığını gösterir."
        },
        {
          heading: "Kör Noktalar ve Rehberlik",
          content: "Kendi kör noktalarımıza karşı körüzdür. Bilinçaltımız bizi o acı verici travmaya gitmekten alıkoyar. Bu yüzden derin duygu boşaltımı seansları için uzman rehberliği önemlidir."
        },
        {
          heading: "Sembolik Görselleştirme (Bilinçaltı Projeksiyonu)",
          content: "Bilinçaltı kelimelerden çok sembollerle konuşur. Çözülemeyen bir sorun (örneğin sürekli borçlanmak veya fiziksel bir semptom) masadaki bir bardağa benzetilir. Kişiden tüm sülalesini o odada hayal etmesi ve 'Bu bardağa sülalenden kim bakıyor?' sorusunu sorması istenir. Zihinsel bir zorlama yapmadan sezgisel olarak beliren ata ve o anda bedende ortaya çıkan ani öfke, utanç veya keder; bastırılmış duygunun gerçek sahibini ve kök travmayı ele verir."
        }
      ],
      quote: "Zihin anlatır, beden ise gerçeği fısıldar."
    },
    {
      id: "tetikleyiciyi-bulmak",
      category: "Pratik Farkındalık",
      categorySlug: "pratik",
      title: "Tetikleyiciyi Bulmak: Belirti Başlamadan Önce Ne Oldu?",
      readTime: "3 dk",
      summary: "Bir duygu veya beden tepkisinin hemen öncesindeki olay, kişi ve düşünceleri geriye doğru izleme yöntemi.",
      sections: [
        { heading: "Üç Adım Geri Git", content: "Belirtiyi fark ettiğin andan başlayıp birkaç dakika veya saat geriye git. Nerede olduğunu, kiminle konuştuğunu ve aklından geçen son cümleyi hatırla. Tetikleyici çoğu zaman büyük olaydan çok küçük bir söz, bakış veya beklentidir." },
        { heading: "Kısa Kayıt", content: "Şu dört satırı doldur: Ne oldu? Ne düşündüm? Bedenimde ne değişti? O anda neye ihtiyacım vardı? İlk gelen cevabı düzeltmeden yaz." }
      ],
      quote: "Tepkinin hemen öncesi, döngünün giriş kapısıdır."
    },
    {
      id: "duygu-dusunce-bedensel-his",
      category: "Pratik Farkındalık",
      categorySlug: "pratik",
      title: "Duygu mu, Düşünce mi, Bedensel His mi?",
      readTime: "3 dk",
      summary: "İç deneyimi üç parçaya ayırarak ne yaşandığını daha açık biçimde görme çalışması.",
      sections: [
        { heading: "Üç Ayrı Katman", content: "Düşünce zihnin cümlesidir: 'Beni önemsemiyor.' Duygu tek veya birkaç kelimedir: öfke, üzüntü, korku. Bedensel his ise fiziksel tariftir: göğüste baskı, midede kasılma, yüzde sıcaklık." },
        { heading: "Uygulama", content: "Bir olay seç ve üç cümle kur: Şu an aklımdan ... geçiyor. Şu an ... hissediyorum. Bedenimde ... fark ediyorum. Katmanları ayırmak tepkinin içindeki ihtiyacı görmeyi kolaylaştırır." }
      ],
      quote: "Düşünce anlatır, duygu yön gösterir, beden işaret verir."
    },
    {
      id: "duygu-yogunlugu-olcegi",
      category: "Pratik Farkındalık",
      categorySlug: "pratik",
      title: "Duygu Yoğunluğu Ölçeği: 0'dan 10'a Kendini Takip Etmek",
      readTime: "2 dk",
      summary: "Bir çalışmanın öncesi ve sonrasındaki değişimi basit bir sayı ile görünür kılma yöntemi.",
      sections: [
        { heading: "Ölçeği Kullan", content: "0 hiçbir yoğunluk yok, 10 dayanılması çok zor yoğunluk demektir. Egzersize başlamadan önce ilk gelen sayıyı seç; uzun uzun hesaplama." },
        { heading: "Sonra Yeniden Bak", content: "Çalışma bittikten birkaç dakika sonra aynı soruyu tekrar sor. Hedef her zaman sıfır değildir. Bir puanlık değişim bile bedenin verdiği cevabı anlamana yardım eder." }
      ],
      quote: "Ölçebildiğin değişimi daha kolay fark edersin."
    },
    {
      id: "tekrarlayan-donguyu-haritalama",
      category: "Döngü Çalışmaları",
      categorySlug: "dongu-pratik",
      title: "Tekrarlayan Döngüyü Haritalama",
      readTime: "4 dk",
      summary: "Tetikleyiciden sonuca kadar tekrar eden davranış zincirini görünür hale getiren pratik şema.",
      sections: [
        { heading: "Döngünün Altı Halkası", content: "Bir örneği şu sırayla yaz: tetikleyici → düşünce → duygu → beden tepkisi → davranış → sonuç. Her halkaya yalnızca bir cümle koy." },
        { heading: "Değişim Noktasını Seç", content: "Tüm döngüyü aynı anda değiştirmeye çalışma. Bir sonraki tekrarda yalnızca tek halkaya müdahale et: durmak, nefes almak, farklı bir cümle kurmak veya sınır belirtmek gibi." }
      ],
      quote: "Döngü görünür olduğunda otomatik olmaktan çıkmaya başlar."
    },
    {
      id: "bastirilmis-ofkenin-isaretleri",
      category: "Duyguları Tanımak",
      categorySlug: "duygular",
      title: "Bastırılmış Öfkenin Günlük İşaretleri",
      readTime: "4 dk",
      summary: "Öfke açıkça hissedilmediğinde ortaya çıkabilen davranışsal ve bedensel ipuçlarını fark etmek.",
      sections: [
        { heading: "Gizli İşaretler", content: "Çene sıkma, içinden tartışmayı sürdürme, küçük olaylara aşırı tepki, sürekli açıklama yapma ihtiyacı, sessizce geri çekilme ve 'önemli değil' deme öfkenin dolaylı işaretleri olabilir." },
        { heading: "Öfkenin Mesajı", content: "Kendine şunu sor: Hangi sınırım aşıldı? Neye hayır demek istedim? Benden alınan veya bana verilmeyen neydi? Cevabı eyleme geçmeden önce yazıya dök." }
      ],
      quote: "Öfke çoğu zaman korunması gereken bir sınırı gösterir."
    },
    {
      id: "sinir-ihlali-ve-ifade",
      category: "Duyguları Tanımak",
      categorySlug: "duygular",
      title: "Sınır İhlalini Fark Etmek ve İfade Etmek",
      readTime: "4 dk",
      summary: "Rahatsızlığı erken fark etme ve kısa, net sınır cümleleri kurma rehberi.",
      sections: [
        { heading: "Erken Sinyaller", content: "Bir görüşmeden kaçınma isteği, omuzlarda gerilme, istemeden evet deme ve sonradan kızgınlık hissetme sınır ihtiyacını gösterebilir. Rahatsızlığın başladığı anı bul." },
        { heading: "Kısa Sınır Cümleleri", content: "Açıklamayı uzatmadan dene: 'Bunu istemiyorum.' 'Şu anda buna hazır değilim.' 'Düşünüp sonra cevap vereceğim.' 'Bu şekilde konuşulduğunda devam etmeyeceğim.'" }
      ],
      quote: "Sınır, uzaklaştırmak değil ilişki içindeki yerini göstermektir."
    },
    {
      id: "kaygi-sezgi-korku",
      category: "Duyguları Tanımak",
      categorySlug: "duygular",
      title: "Kaygı, Sezgi ve Korkuyu Ayırt Etmek",
      readTime: "4 dk",
      summary: "Acele ettiren zihinsel senaryolar ile sakin iç gözlemi birbirinden ayırmaya yönelik sorular.",
      sections: [
        { heading: "Sesin Niteliğini Dinle", content: "Kaygı genellikle tekrar eder, çok sayıda kötü senaryo üretir ve hemen karar ister. Sezgi daha kısa, sade ve sakindir. Korku ise belirli bir tehlikeye karşı bedeni harekete hazırlar." },
        { heading: "Karardan Önce Dur", content: "Kendine sor: Şu anda kesin olarak bildiğim ne? Varsaydığım ne? Bir gece beklesem kararım değişir mi? Bedeni sakinleştirdikten sonra aynı konuya yeniden bak." }
      ],
      quote: "Acele eden her iç ses sezgi değildir."
    },
    {
      id: "ic-elestirmenle-konusmak",
      category: "İçsel Diyalog",
      categorySlug: "icsel-dialog",
      title: "İç Eleştirmenle Konuşmak",
      readTime: "4 dk",
      summary: "Kendini suçlayan otomatik sesi fark edip daha dengeli bir iç cevap oluşturma çalışması.",
      sections: [
        { heading: "Cümleyi Yakala", content: "Zorlandığında zihninden geçen en sert cümleyi aynen yaz: 'Yine beceremedin' gibi. Sonra bu sesin kimi veya hangi dönemi hatırlattığını düşün." },
        { heading: "Dengeli Cevap", content: "Aşırı olumlu bir karşılık kurmak yerine gerçekçi ol: 'Şu anda zorlanıyorum ama bu tek olay bütün değerimi belirlemiyor.' Aynı cümleyi sevdiğin birine nasıl söylerdin, onu yaz." }
      ],
      quote: "İç sesin tanıdık olması onun doğru olduğu anlamına gelmez."
    },
    {
      id: "utanc-ve-sucluluk",
      category: "Duyguları Tanımak",
      categorySlug: "duygular",
      title: "Utanç ve Suçluluk Arasındaki Fark",
      readTime: "3 dk",
      summary: "Kimliğe yönelen utanç ile davranışa yönelen suçluluğu ayırt edip uygun adımı seçmek.",
      sections: [
        { heading: "İki Farklı Cümle", content: "Utanç 'Ben kötüyüm veya yetersizim' der. Suçluluk 'Yaptığım bir şey değerlerime uymadı' der. İlki kimliği kapatır, ikincisi düzeltme ihtimalini gösterebilir." },
        { heading: "Dönüştürücü Soru", content: "Kendine sor: Burada gerçekten sorumluluğum ne? Telafi edebileceğim bir davranış var mı? Bana ait olmayan hangi yükü üzerime alıyorum?" }
      ],
      quote: "Davranışını değerlendirmek, bütün benliğini mahkûm etmek değildir."
    },
    {
      id: "bedende-guven-hissi",
      category: "Öz Düzenleme",
      categorySlug: "oz-duzenleme",
      title: "Bedende Güven Hissi Oluşturmak",
      readTime: "3 dk",
      summary: "Yoğun duygular sırasında dikkati şimdiki ana ve çevredeki güvenli işaretlere getirme çalışması.",
      sections: [
        { heading: "Çevreye Dön", content: "Ayaklarının zemine temasını hisset. Çevrende gördüğün beş nesneyi, duyduğun üç sesi ve bedeninde nötr hissettiren bir bölgeyi sırayla fark et." },
        { heading: "Güven Cümlesi", content: "Bulunduğun yeri ve zamanı içinden söyle: 'Şu an buradayım. Bugün ... Bedenim güçlü bir duygu yaşıyor ve ben çevremi görebiliyorum.' Nefesi zorlamadan doğal ritmini izle." }
      ],
      quote: "Güven bazen önce düşüncede değil, bedende küçük bir alan olarak başlar."
    },
    {
      id: "duygunun-ihtiyaci",
      category: "Duyguları Tanımak",
      categorySlug: "duygular",
      title: "Bir Duygu Tamamlanmadan Önce Ne İster?",
      readTime: "4 dk",
      summary: "Duyguyu susturmak yerine altında bulunan ihtiyacı dinlemeye yönelik kısa rehber.",
      sections: [
        { heading: "İhtiyacı Sor", content: "Öfke sınır veya adalet, üzüntü yas ve yakınlık, korku güvenlik ve hazırlık, suçluluk telafi, yalnızlık temas isteyebilir. Bunları kesin cevap değil başlangıç sorusu olarak kullan." },
        { heading: "Küçük Karşılık", content: "Duygunun istediği ihtiyacı bugün yüzde yüz karşılamak zorunda değilsin. Beş dakikalık dinlenme, kısa bir mesaj, bir hayır cümlesi veya not almak gibi en küçük uygulanabilir adımı seç." }
      ],
      quote: "Duygu duyulduğunda, davranış seçilebilir hale gelir."
    },
    {
      id: "gunluk-icin-yedi-soru",
      category: "Pratik Farkındalık",
      categorySlug: "pratik",
      title: "Günlük Tutarken Sorulabilecek 7 Soru",
      readTime: "3 dk",
      summary: "Bir olayı kısa sürede çözümlemek için kullanılabilecek yedi soruluk günlük şablonu.",
      sections: [
        { heading: "Yedi Soru", content: "Ne oldu? Ne düşündüm? Ne hissettim? Bedenimin neresinde hissettim? Ne yapmak istedim? Asıl neye ihtiyacım vardı? Şimdi kendim için ne yapabilirim?" },
        { heading: "Kısa Tut", content: "Her soruya bir veya iki cümle yeterlidir. Güzel yazmaya ya da doğru cevabı bulmaya çalışma. Aynı sorulara zaman içinde verilen cevaplar tekrar eden örüntüleri gösterir." }
      ],
      quote: "Düzenli birkaç cümle, seyrek yazılmış uzun sayfalardan daha işlevsel olabilir."
    },
    {
      id: "ayni-kisi-ve-olaylar",
      category: "Döngü Çalışmaları",
      categorySlug: "dongu-pratik",
      title: "Aynı Kişi ve Olayların Tekrar Etmesi",
      readTime: "4 dk",
      summary: "Benzer ilişki deneyimlerinde değişmeden kalan kendi rolünü ve beklentilerini inceleme çalışması.",
      sections: [
        { heading: "Ortak Noktayı Bul", content: "Tekrar eden üç olayı yan yana yaz. Kişiler farklı olsa bile başlangıçtaki beklentini, görmezden geldiğin ilk işareti ve sonunda verdiğin tepkiyi karşılaştır." },
        { heading: "Yeni Bir Seçim", content: "Bir sonraki benzer durumda daha erken yapabileceğin tek şeyi belirle: soru sormak, beklemek, sınır koymak, yardım istemek veya ortamdan ayrılmak." }
      ],
      quote: "Tekrarı kıran şey her zaman büyük karar değil, daha erken verilen küçük cevaptır."
    },
    {
      id: "kontrol-ihtiyacinin-altindaki-korku",
      category: "İçsel Diyalog",
      categorySlug: "icsel-dialog",
      title: "Kontrol İhtiyacının Altındaki Korku",
      readTime: "4 dk",
      summary: "Belirsizliğe tahammülsüzlük ve hata yapma korkusunu fark etmeye yönelik uygulama.",
      sections: [
        { heading: "Kontrol Listesi", content: "Sürekli plan değiştirmek, başkasının işini tekrar kontrol etmek, karar verememek veya her ihtimali düşünmek kontrol ihtiyacının işaretleri olabilir. Arkasındaki en kötü senaryoyu tek cümleyle yaz." },
        { heading: "Yüzde Beş Belirsizlik", content: "Tamamen bırakmak yerine küçük bir alan seç. Bir mesajı tekrar okumadan göndermek, küçük bir işi devretmek veya kararı on dakika ertelemek gibi yüzde beşlik bir belirsizlik deneyi yap." }
      ],
      quote: "Kontrol azaldığında önce belirsizlik, sonra esneklik görünür."
    },
    {
      id: "egzersiz-sonrasi-entegrasyon",
      category: "Öz Düzenleme",
      categorySlug: "oz-duzenleme",
      title: "Egzersiz Sonrası Entegrasyon",
      readTime: "3 dk",
      summary: "Yoğun bir farkındalık veya sembolik çalışmadan sonra bedeni ve zihni günlük yaşama hazırlama adımları.",
      sections: [
        { heading: "Kapanış Yap", content: "Çalışma bittiğinde hemen başka bir yoğun konuya geçme. Bir bardak su iç, çevrene bak, ellerini ve ayaklarını hareket ettir. O anki duygu yoğunluğunu 0–10 arasında yeniden değerlendir." },
        { heading: "Tek Cümle Kaydet", content: "Bugün ne fark ettim ve şimdi neye ihtiyacım var? Bu iki soruya birer cümle yaz. Gerekirse kısa bir yürüyüş, dinlenme veya güvendiğin biriyle temas gibi basit bir sonraki adım seç." }
      ],
      quote: "Farkındalık çalışması, günlük hayata sakin bir dönüşle tamamlanır."
    }
  ],

  symptoms: [
    {
      id: "mide",
      name: "Mide ve Sindirim Sorunları",
      region: "stomach",
      regionTitle: "Mide & Karın",
      keywords: ["mide", "reflü", "gastrit", "sindirim", "şişkinlik", "bulantı"],
      rootEmotion: "Kabul Edilemeyen, Hazmedilemeyen Durum veya Kişi",
      conflict: "Hayatında 'lokmayı' (olayı, lafı, haksızlığı) yutamama veya sindirememe şoku.",
      question: "Şu an hayatında kabul etmekte imkan bulamadığın, hazmedemediğin hangi durum veya kim var?",
      suggestedIntention: "Bilinçaltım, bu mide rahatsızlığının altındaki hazmedemediğim öfkeyi ve olayı bulup şifalandır. Sana güveniyorum."
    },
    {
      id: "egzama-cilt",
      name: "Cilt Sorunları ve Egzama",
      region: "skin",
      regionTitle: "Cilt & Dış Yüzey",
      keywords: ["egzama", "sedef", "cilt", "kaşıntı", "döküntü", "alerji"],
      rootEmotion: "Ayrılık Travması veya Sınır İhlali",
      conflict: "Sevilen birinden aniden ayrı kalma ya da istemediği bir temas ve alan ihlaline maruz kalma çatışması.",
      question: "Bu lezyon başlamadan hemen önce kimden ayrıldın ya da alanına kim istemeden müdahale etti?",
      suggestedIntention: "Bilinçaltım, bu cilt reaksiyonunun altındaki ayrılık acısını ve sınır ihlali şokunu şifalandır. Güvendeyim."
    },
    {
      id: "kemik-eklem",
      name: "Kemik, Eklem ve Kas Ağrıları",
      region: "bones",
      regionTitle: "İskelet & Eklem",
      keywords: ["kemik", "eklem", "diz", "omurga", "kireçlenme", "romatizma", "fıtık"],
      rootEmotion: "Derin Değersizlik veya İşe Yaramazlık Hissi",
      conflict: "Kişinin kendini belirli bir alanda (iş, aile, spor) tamamen yetersiz, başarısız veya işe yaramaz hissetmesi.",
      question: "Kendini en çok nerede 'işe yaramaz', 'başarısız' veya 'değersiz' hissettin?",
      suggestedIntention: "Bilinçaltım, bu eklem/kemik gerginliğinin altındaki derin değersizlik hissini bul ve serbest bırak. Özdeğerimi kucaklıyorum."
    },
    {
      id: "bogaz-ses",
      name: "Boğaz ve Ses Kısılması",
      region: "throat",
      regionTitle: "Boyun & Boğaz",
      keywords: ["boğaz", "ses", "tiroid", "yutkunma", "öksürük"],
      rootEmotion: "İfade Edilemeyen Sözler ve Yutkunan Öfke",
      conflict: "Söylemek isteyip de yutmak zorunda kaldığın ağır laflar, ifade kısıtlanması veya yutkunma güçlüğü.",
      question: "Kime veya hangi olaya karşı sesini çıkaramadın, neleri içine yutmak zorunda kaldın?",
      suggestedIntention: "Bilinçaltım, boğazımda düğümlenen ve söyleyemediğim tüm kelimeleri sevgiyle serbest bırak."
    },
    {
      id: "gogus-nefes",
      name: "Göğüs Daralması ve Nefes Kilitlenmesi",
      region: "chest",
      regionTitle: "Göğüs & Akciğer",
      keywords: ["nefes", "göğüs", "daralma", "astım", "baskı", "panik"],
      rootEmotion: "Kişisel Alan İhlali, Boğulma ve Alan Sıkışması",
      conflict: "Kendi bölgesinde/evinde/işinde özgürce nefes alamama, boğulma ve alanını kaybetme korkusu.",
      question: "Hayatında kendini nerede kapana kısılmış, boğulmuş ve kişisel alanından mahrum hissediyorsun?",
      suggestedIntention: "Bilinçaltım, göğsümdeki bu baskının altındaki kapana kısılmışlık hissini dönüştür. Kendi alanıma sahibim."
    },
    {
      id: "kalp-dolasim",
      name: "Kalp Çarpıntısı ve Dolaşım",
      region: "heart",
      regionTitle: "Kalp & Göğüs",
      keywords: ["kalp", "çarpıntı", "tansiyon", "damar", "dolaşım"],
      rootEmotion: "Sevgi Alışverişinde Tıkanıklık ve Aşırı Bölgesel Yük",
      conflict: "Evini/ailesini korumak için aşırı efor sarf etme veya sevgiyi alamama/verememe çatışması.",
      question: "Ailende veya ilişkinde tek başına sırtlandığın ağır yük veya sevgi eksikliği nerede?",
      suggestedIntention: "Bilinçaltım, kalbimdeki bu yükü ve sevgisizlik korkusunu şifalandır. Huzuru seçiyorum."
    },
    {
      id: "bagimlilik-sigara",
      name: "Sigara Bağımlılığı",
      region: "chest",
      regionTitle: "Göğüs & Solunum",
      keywords: ["sigara", "tütün", "duman", "nefes", "bağımlılık"],
      rootEmotion: "Özgür Nefes İhtiyacı ve Sınır Baskısı",
      conflict: "Geçmişte yaşanan boğulma, baskı, kişisel alan ihlali travmalarına karşı suni bir 'özgürlük anı/mola' yaratma çabası.",
      question: "Sigara yakarken aslında hangi baskıdan kaçıp kendi alanına çekilmek istiyorsun?",
      suggestedIntention: "Bilinçaltım, sigara ihtiyacımın altındaki alan ihlali ve boğulma travmasını şifalandır. Özgürce nefes alıyorum."
    },
    {
      id: "bagimlilik-alkol",
      name: "Alkol Bağımlılığı",
      region: "stomach",
      regionTitle: "Karın & Karaciğer",
      keywords: ["alkol", "içki", "bağımlılık", "sığınma"],
      rootEmotion: "Anne Sevgisi Eksikliği veya Referans Noktası Şoku",
      conflict: "Anne sıcaklığı (kan bağı) eksikliğini ikame etme veya hayattaki pusulasını kaybetme şoku.",
      question: "Hayatında ne zaman güvendiğin ana referans noktanı kaybettin veya anne sevgisinden mahrum hissettin?",
      suggestedIntention: "Bilinçaltım, alkole sığınmama neden olan anne sevgisi boşluğunu ve güvensizliği şifalandır."
    },
    {
      id: "para-borc",
      name: "Sürekli Borç ve Para Tutamama Döngüsü",
      region: "pelvis",
      regionTitle: "Kök / Pelvis & Güvenlik",
      keywords: ["para", "borç", "iflas", "fark", "yoksulluk", "maddi"],
      rootEmotion: "Baba Arketip Eksikliği ve Atasal Bedel Ödeme",
      conflict: "Anne arketipi bolluk verirken, inşa eden Baba arketipinin eksikliği parayı elde tutamamaya; atasal suçluluk ise borçla bedel ödemeye yol açar.",
      question: "Maddi olarak biriktirmene izin vermeyen ailevi inanç veya babanla olan güven bağın nasıl?",
      suggestedIntention: "Bilinçaltım, finansal krizlerimin altındaki atasal sadakati ve değersizlik inancını şifalandır. Refahı hak ediyorum."
    },
    {
      id: "bas-agrisi-migren",
      name: "Baş Ağrısı ve Migren",
      region: "head",
      regionTitle: "Baş & Zihin",
      keywords: ["baş", "migren", "zihin", "baskı", "düşünce"],
      rootEmotion: "Aşırı Kontrol Etme ve Entelektüel Değersizlik",
      conflict: "Filozof'un (mantığın) Kromanyon'u bastırma çabası, her şeyi zihinle çözmeye çalışma stresi.",
      question: "Zihninde kontrol etmeye çalıştığın ve teslim olamadığın belirsizlik nedir?",
      suggestedIntention: "Bilinçaltım, zihnimdeki aşırı kontrol baskısını gevşet. Bilinçaltımın bilgeliğine teslim oluyorum."
    }
  ],

  exercises: [
    {
      id: "uyku-oncesi-rituel",
      title: "Uyku Öncesi 5 Dakika Niyet Ritüeli",
      type: "timer",
      durationSeconds: 300,
      description: "Zihninizin Teta dalgalarına geçtiği uyku öncesi an, Kromanyon'un doğrudan talimat aldığı en güçlü zamandır.",
      steps: [
        "Yatağınıza rahatça uzanın ve gözlerinizi kapatın.",
        "4 saniye nefes alın, 7 saniye tutun, 8 saniyede sakince verin.",
        "Bu gece üzerinde çalışmak istediğiniz tek bir spesifik soruna odaklanın.",
        "Endişelenmeyi bırakın. Sadece niyetinizi fısıldayın: 'Bilinçaltım, bu sorunu benim için sen çöz. Sana güveniyorum.'",
        "Zihni zorlamadan kendinizi uykunun akışına bırakın."
      ]
    },
    {
      id: "sembolik-vedalasma",
      title: "Sembolik Eylemler ve Dijital Veda Tuvali",
      type: "canvas",
      description: "Kromanyon entelektüel konuşmalardan anlamaz; görselleri, çizimleri ve sembolik yakma/gömme ritüellerini anlar.",
      steps: [
        "Hayatınızdan çıkarmak istediğiniz bir engeli veya toksik döngüyü kağıda (veya aşağıdaki dijital tuvala) çizin.",
        "Çizime bakarken bedensel hissinizi fark edin.",
        "Ardından 'Sembolik Olarak Yak / Yok Et' butonuna basarak Kromanyon'a bu döngünün bittiği mesajını iletin."
      ]
    },
    {
      id: "sozun-gucu",
      title: "Sözün Gücü (Sesli Yüzleşme Egzersizi)",
      type: "vocal",
      description: "İzole edilmiş ve karantinaya alınmış duyguları yüksek sesle dile getirmek, beden kilitlerini açar.",
      prompts: [
        "Olay anında sesimi çıkaramadığım kişi karşımda olsaydı ona şunu derdim: ...",
        "Bedenimde hissettiğim bu düğüm bana aslında şunu anlatmak istiyor: ...",
        "Artık atasal suçluluğu taşımayı bırakıyorum ve kendime izin veriyorum..."
      ]
    },
    {
      id: "somatik-farkindalik",
      title: "Somatik Beden Taraması ve Beden Pusulası",
      type: "somatic",
      description: "Zihin olayları rasyonalize edebilir ama beden asla yalan söylemez. Bastırılmış duygunun saklandığı yeri bedensel sinyallerle keşfedin.",
      steps: [
        "Sırtınız dik şekilde oturun, gözlerinizi kapatın ve dikkatinizi bedeninize verin.",
        "Üzerinde çalıştığınız konuyu veya kişiyi düşünürken bedenin istemsiz tepkilerini izleyin: Ellerinizde terleme, göğsünüzde daralma, nefes kilitlenmesi veya boğazınızda düğüm var mı?",
        "Bu fiziksel hissi değiştirmeye veya bastırmaya çalışmayın. Bedeninizi bir pusula gibi kabul edin.",
        "Dikkatinizi o bölgeye yönelterek sakince nefes verin: 'Seni görüyorum, buradasın ve güvendeyiz.' diyerek duygunun serbest kalmasına izin verin."
      ]
    },
    {
      id: "masadaki-bardak-projeksiyon",
      title: "Bilinçaltı Projeksiyonu (Masadaki Bardak ve Aile Odası)",
      type: "projection",
      description: "Bilinçaltının sembolik projeksiyon yeteneğini kullanarak tekrar eden döngülerin ve kilitlenmelerin hangi ataya veya kök olaya ait olduğunu sezgisel olarak keşfedin.",
      steps: [
        "Sürekli tekrarlayan tıkanıklığınızı (borç, hastalık, terkedilme) masanın ortasındaki bir bardağa veya nesneye yansıtın.",
        "Gözlerinizi kapatın; tüm aile ağacınızı ve atalarınızı o odada, masanın etrafında hayal edin.",
        "Bilinçaltınıza sorun: 'Bu bardağa sülalemden kim bakıyor? Bu yük asıl kime ait?'",
        "Zihninizi zorlamayın; gözünüzün önüne ilk gelen dede, anneanne veya hiç tanımadığınız atayı fark edin.",
        "O figüre odaklandığınızda bedeninizde aniden ortaya çıkan hissi (öfke, hüzün, borçluluk, suçluluk) gözlemleyin.",
        "Özgürleştirici cümleyi sesli veya içten söyleyin: 'Bu senin kaderindi, acını saygıyla onurlandırıyorum ama bedelini ödemeyi bırakıyorum. Ben kendi yaşamıma izin veriyorum.'"
      ]
    }
  ]
};

