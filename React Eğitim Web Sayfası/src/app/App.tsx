import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CodedexCursor } from './components/CodedexCursor';
import { CodedexNavbar } from './components/CodedexNavbar';
import { CodedexHero } from './components/CodedexHero';
import { TurkceLesson } from './components/TurkceLesson';
import { Trophy, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeSection, setActiveSection] = useState('baslangic');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['baslangic', 'tsx', 'props', 'state', 'hooks'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerVictory = () => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFE66D', '#95E1D3', '#A8DADC', '#F38181', '#FFB6C1', '#4ECDC4'],
    });
  };

  const lessons = [
    {
      id: 'tsx',
      title: 'TSX NEDİR?',
      emoji: '📝',
      subtitle: 'TypeScript ile JSX: Tip güvenli React bileşenleri',
      level: 1,
      color: '#FFE66D',
      sections: {
        theory: {
          title: 'TSX NEDEN ÖNEMLİDİR?',
          content: [
            'TSX (TypeScript JSX), React\'in JSX sözdizimini TypeScript\'in tip güvenliği ile birleştirir. Her element, prop ve olay işleyicisi derleme zamanında tip kontrolünden geçer.',
            'JSX, HTML benzeri sözdizimini doğrudan TypeScript içinde yazmanıza olanak tanır. Bu sayede bileşen yapınız daha okunabilir olur ve tam tip çıkarımı sağlanır.',
            'TypeScript, JSX elementlerini otomatik olarak prop tiplerine göre doğrular. Tüm kullanılabilir props ve beklenen tipleri için otomatik tamamlama ve IntelliSense desteği sunar.',
            'TSX ile prop uyumsuzlukları, element adlarındaki yazım hataları ve geçersiz children\'ları kod yazarken, hata ayıklamak yerine anında tespit edersiniz.',
          ],
        },
        code: {
          title: 'TSX NASIL ÇALIŞIR?',
          description:
            'TSX, TypeScript derleyicisi tarafından React.createElement() çağrılarına dönüştürülür ve tüm tip bilgisi korunur. TypeScript, JavaScript oluşturmadan önce element tiplerini, prop tiplerini ve children tiplerini doğrular.',
          example: `// Yazdığınız TSX kodu:
interface ButtonProps {
  metin: string;
  tikla: () => void;
  varyant?: 'birincil' | 'ikincil';
}

function Buton({ metin, tikla, varyant = 'birincil' }: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${varyant}\`}
      onClick={tikla}
    >
      {metin}
    </button>
  );
}

// TypeScript bu kullanımı derleme zamanında doğrular:
<Buton
  metin="Tıkla"
  tikla={() => console.log('Tıklandı!')}
  varyant="birincil"
/>

// Bu TypeScript hatası verir:
// <Buton metin={123} /> // Hata: 'number' tipi 'string' tipine atanamaz

// Derleme sonrası (basitleştirilmiş):
React.createElement(
  'button',
  {
    className: \`btn btn-\${varyant}\`,
    onClick: tikla
  },
  metin
);`,
        },
        typescript: {
          title: 'TYPESCRIPT ÖZELLİKLERİ',
          items: [
            {
              name: 'GENERİK BİLEŞENLER',
              description: 'Tip güvenliğini korurken her tipte çalışan yeniden kullanılabilir bileşenler oluşturun.',
              code: `interface ListeProps<T> {
  ögeler: T[];
  öğeRender: (öğe: T) => JSX.Element;
}

function Liste<T>({ ögeler, öğeRender }: ListeProps<T>) {
  return (
    <ul>
      {ögeler.map((öğe, i) => (
        <li key={i}>{öğeRender(öğe)}</li>
      ))}
    </ul>
  );
}

// Tam tip çıkarımı ile kullanım:
<Liste<string>
  ögeler={['React', 'TypeScript', 'TSX']}
  öğeRender={(öğe) => <span>{öğe}</span>}
/>`,
            },
            {
              name: 'REACT.FC TİPİ',
              description: 'Children tipi ve dönüş tipi doğrulaması sağlayan Fonksiyonel Bileşen tipi.',
              code: `import { FC } from 'react';

interface KartProps {
  baslik: string;
  aciklama?: string;
}

const Kart: FC<KartProps> = ({ baslik, aciklama, children }) => {
  return (
    <div className="kart">
      <h2>{baslik}</h2>
      {aciklama && <p>{aciklama}</p>}
      {children}
    </div>
  );
};`,
            },
            {
              name: 'OLAY TİPLERİ',
              description: 'TypeScript tüm DOM olayları için özel tipler sunar, tip güvenli olay işleme sağlar.',
              code: `import { ChangeEvent, FormEvent } from 'react';

function AramaFormu() {
  const degisiklikIsle = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const gonderIsle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Tip güvenli form işleme
  };

  return (
    <form onSubmit={gonderIsle}>
      <input onChange={degisiklikIsle} />
    </form>
  );
}`,
            },
            {
              name: 'PROP BİRLEŞİMLERİ',
              description: 'Karşılıklı olarak özel prop\'lara sahip polimorfik bileşenler oluşturmak için ayrıştırılmış birleşimler kullanın.',
              code: `type ButonProps =
  | { varyant: 'link'; href: string }
  | { varyant: 'button'; onClick: () => void };

function Buton(props: ButonProps) {
  if (props.varyant === 'link') {
    return <a href={props.href}>Link</a>;
  }
  return <button onClick={props.onClick}>Buton</button>;
}`,
            },
          ],
        },
        mistakes: {
          title: 'YAYGIZ HATALAR',
          items: [
            {
              title: 'Fragment Tiplemesini Unutmak',
              description:
                'JSX ifadeleri tek bir element döndürmelidir. Gereksiz wrapper div\'lerden kaçınmak için Fragment (<></>) kullanın.',
              wrong: `function Bileşen() {
  return (
    <h1>Başlık</h1>
    <p>İçerik</p>
  );
}`,
              right: `function Bileşen() {
  return (
    <>
      <h1>Başlık</h1>
      <p>İçerik</p>
    </>
  );
}`,
            },
            {
              title: 'Yanlış Olay İşleyici Tipleri',
              description:
                'Genel Event tipi yerine özel React olay tiplerini kullanmak otomatik tamamlama ve tip güvenliği sağlar.',
              wrong: `function tiklaIsle(e: Event) {
  // TypeScript React\'in SyntheticEvent\'ini tanımaz
  e.preventDefault();
}

<button onClick={tiklaIsle}>Tıkla</button>`,
              right: `import { MouseEvent } from 'react';

function tiklaIsle(e: MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  // Tam tip güvenliği ve otomatik tamamlama
}

<button onClick={tiklaIsle}>Tıkla</button>`,
            },
          ],
        },
      },
      playground: {
        code: `// TSX Element Fabrikası Simülasyonu
interface ElementProps {
  tip: string;
  özellikler: Record<string, any>;
  içerik?: string;
}

function elementOluştur(tip: string, özellikler: Record<string, any>, içerik?: string): ElementProps {
  return { tip, özellikler, içerik };
}

// TSX derlemesini simüle et
const buton = elementOluştur(
  'button',
  { className: 'birincil', disabled: false },
  'Bana Tıkla!'
);

customConsole.log("Element Tipi:", buton.tip);
customConsole.log("Element Özellikleri:", JSON.stringify(buton.özellikler, null, 2));
customConsole.log("Element İçeriği:", buton.içerik);`,
        title: 'TSX Element Fabrikası',
        description: 'TSX\'in React.createElement çağrılarına nasıl derlendiğini anlayın',
      },
    },
    {
      id: 'props',
      title: 'PROPS VE TİPLER',
      emoji: '🎁',
      subtitle: 'Interface ve tip çıkarımı ile tip güvenli bileşen iletişimi',
      level: 2,
      color: '#95E1D3',
      sections: {
        theory: {
          title: 'PROPS NEDEN TİPLENDİRİLMELİ?',
          content: [
            'Props tiplemesi, üst bileşenlerin alt bileşenlere doğru veri tiplerini iletmesini sağlar ve bir sınıf çalışma zamanı hatasını derleme zamanında önler.',
            'TypeScript interface\'leri, bileşen API\'nizi otomatik olarak belgeler - geliştiriciler uygulama kodunu okumadan hangi prop\'ların gerekli, isteğe bağlı ve tiplerini bilir.',
            'Yeniden düzenleme güvenli hale gelir: bir prop tipini değiştirdiğinizde, TypeScript hemen güncellenmesi gereken her bileşeni gösterir.',
            'IntelliSense otomatik tamamlama, yazarken açıklamalarla birlikte tüm kullanılabilir prop\'ları gösterir, geliştirici deneyimini iyileştirir.',
          ],
        },
        code: {
          title: 'PROP TİPLERİNİ TANIMLAMA',
          description:
            'Props, TypeScript interface\'leri veya tip takma adları kullanılarak tiplendirilir. Bileşen parametresinde props\'ları parçaladığınızda, TypeScript her özellik için tipleri çıkarır ve her çağrı sitesinde doğrular.',
          example: `// Interface yaklaşımı (bileşenler için tercih edilir)
interface KullaniciKartiProps {
  isim: string;
  yas: number;
  eposta: string;
  aktif?: boolean;
  duzenle: (id: number) => void;
  metadata?: {
    katilmaTarihi: Date;
    rol: 'admin' | 'kullanici';
  };
}

function KullaniciKarti({ isim, yas, eposta, aktif = false, duzenle }: KullaniciKartiProps) {
  return (
    <div className="kullanici-karti">
      <h2>{isim}</h2>
      <p>Yaş: {yas}</p>
      <p>E-posta: {eposta}</p>
      <p>Durum: {aktif ? 'Aktif' : 'Pasif'}</p>
      <button onClick={() => duzenle(1)}>Düzenle</button>
    </div>
  );
}

// Tip kontrolü ile kullanım:
<KullaniciKarti
  isim="Ayşe Yılmaz"
  yas={28}
  eposta="ayse@ornek.com"
  aktif={true}
  duzenle={(id) => console.log(\`Kullanıcı \${id} düzenleniyor\`)}
/>

// Union tipler için tip takma adı
type ButonBoyutu = 'küçük' | 'orta' | 'büyük';

interface ButonProps {
  boyut: ButonBoyutu;
  children: React.ReactNode;
}`,
        },
        typescript: {
          title: 'GELİŞMİŞ PROP DESENLERİ',
          items: [
            {
              name: 'VARSAYILAN PROPS',
              description: 'Tip güvenli varsayılan prop\'lar için varsayılan değerlerle parametre parçalama kullanın.',
              code: `interface ButonProps {
  metin: string;
  varyant?: 'birincil' | 'ikincil';
  boyut?: 'kc' | 'ort' | 'by';
}

function Buton({
  metin,
  varyant = 'birincil',
  boyut = 'ort'
}: ButonProps) {
  return (
    <button className={\`btn-\${varyant} btn-\${boyut}\`}>
      {metin}
    </button>
  );
}`,
            },
            {
              name: 'PROPS GENİŞLETME',
              description: 'Geliştirilmiş özel bileşenler oluşturmak için HTML element prop\'larını genişletin.',
              code: `import { ComponentProps } from 'react';

type OzelButonProps = ComponentProps<'button'> & {
  yukleniyor?: boolean;
};

function OzelButon({ yukleniyor, children, ...rest }: OzelButonProps) {
  return (
    <button {...rest} disabled={yukleniyor || rest.disabled}>
      {yukleniyor ? 'Yükleniyor...' : children}
    </button>
  );
}`,
            },
          ],
        },
        mistakes: {
          title: 'PROP TİP HATALARI',
          items: [
            {
              title: 'Props\'ları Değiştirme',
              description:
                'Props değiştirilemez. Props\'ları asla doğrudan değiştirmeyin - her zaman state kullanın veya callback\'leri yukarı iletin.',
              wrong: `interface SayacProps {
  sayi: number;
}

function Sayac(props: SayacProps) {
  props.sayi++; // HATA: \'sayi\'ya atanamaz
  return <div>{props.sayi}</div>;
}`,
              right: `interface SayacProps {
  sayi: number;
  arttir: () => void;
}

function Sayac({ sayi, arttir }: SayacProps) {
  return (
    <div>
      <p>{sayi}</p>
      <button onClick={arttir}>Arttır</button>
    </div>
  );
}`,
            },
          ],
        },
      },
      playground: {
        code: `// Props tip kontrolü simülasyonu
interface KullaniciVerisi {
  isim: string;
  yas: number;
  eposta: string;
  aktif: boolean;
}

function propsDogrula(veri: unknown): veri is KullaniciVerisi {
  const d = veri as KullaniciVerisi;
  return (
    typeof d.isim === 'string' &&
    typeof d.yas === 'number' &&
    typeof d.eposta === 'string' &&
    typeof d.aktif === 'boolean'
  );
}

const gecerliKullanici = {
  isim: "Ahmet",
  yas: 28,
  eposta: "ahmet@ornek.com",
  aktif: true
};

const gecersizKullanici = {
  isim: "Mehmet",
  yas: "otuz", // Yanlış tip!
  eposta: "mehmet@ornek.com"
};

customConsole.log("Geçerli kullanıcı kontrolü:", propsDogrula(gecerliKullanici));
customConsole.log("Geçersiz kullanıcı kontrolü:", propsDogrula(gecersizKullanici));

if (propsDogrula(gecerliKullanici)) {
  customConsole.log("Kullanıcı adı:", gecerliKullanici.isim);
  customConsole.log("Kullanıcı yaşı:", gecerliKullanici.yas);
}`,
        title: 'Props Tip Doğrulaması',
        description: 'Props verisi için çalışma zamanı tip kontrolü',
      },
    },
    {
      id: 'state',
      title: 'STATE<T>',
      emoji: '🔄',
      subtitle: 'useState<T> generic\'leri ile tip güvenli durum yönetimi',
      level: 3,
      color: '#A8DADC',
      sections: {
        theory: {
          title: 'STATE NEDEN TİPLENDİRİLMELİ?',
          content: [
            'TypeScript generic\'leri ile useState, durum güncellemelerinizin tip güvenli olmasını sağlar. TypeScript, state\'i uyumsuz tiplere ayarlama girişimlerini çalışma zamanından önce yakalar.',
            'Karmaşık state objeleri güncellemeler boyunca şekillerini korur. TypeScript, yanlışlıkla özellik adları eklemediğinizi, kaldırmadığınızı veya yanlış yazmadığınızı doğrular.',
            'Dizi ve obje state işlemleri (map, filter, reduce) tip bilgisini korur, her eleman üzerinde otomatik tamamlama ve tip kontrolü sağlar.',
            'Asenkron state güncellemeleri doğrulanır: API\'lerden veri çekerken, TypeScript yanıtın güncellemeden önce beklenen state tipinizle eşleştiğinden emin olur.',
          ],
        },
        code: {
          title: 'USESTATE<T> İLE TİPLENDİRİLMİŞ STATE',
          description:
            'useState, state tipini tanımlayan bir generic tip parametresi kabul eder. TypeScript tipi başlangıç değerinden çıkarır veya karmaşık tipler için açıkça sağlayabilirsiniz.',
          example: `import { useState } from 'react';

// Basit tipler (TypeScript tipi çıkarır)
function Sayac() {
  const [sayi, sayiAyarla] = useState(0); // number olarak çıkarıldı
  const [mesaj, mesajAyarla] = useState(''); // string olarak çıkarıldı

  return (
    <div>
      <p>{sayi}</p>
      <button onClick={() => sayiAyarla(sayi + 1)}>Arttır</button>
    </div>
  );
}

// Karmaşık tipler için açık tipleme
interface Kullanici {
  id: number;
  isim: string;
  eposta: string;
}

function KullaniciProfili() {
  // Açık generic tip
  const [kullanici, kullaniciAyarla] = useState<Kullanici | null>(null);

  const kullaniciYukle = async () => {
    const yanit = await fetch('/api/kullanici');
    const veri: Kullanici = await yanit.json();
    kullaniciAyarla(veri); // TypeScript bunu Kullanici tipiyle doğrular
  };

  return kullanici ? <div>{kullanici.isim}</div> : <div>Yükleniyor...</div>;
}

// Tipleme ile dizi state
interface Gorev {
  id: number;
  metin: string;
  tamamlandi: boolean;
}

function GorevListesi() {
  const [gorevler, gorevlerAyarla] = useState<Gorev[]>([]);

  const gorevEkle = (metin: string) => {
    const yeniGorev: Gorev = {
      id: Date.now(),
      metin,
      tamamlandi: false,
    };
    gorevlerAyarla([...gorevler, yeniGorev]); // Tip güvenli spread
  };

  return (
    <ul>
      {gorevler.map(gorev => (
        <li key={gorev.id}>{gorev.metin}</li>
      ))}
    </ul>
  );
}`,
        },
        typescript: {
          title: 'GELİŞMİŞ STATE DESENLERİ',
          items: [
            {
              name: 'BİRLEŞİK STATE TİPLERİ',
              description: 'State makineleri ve karmaşık state akışları için ayrıştırılmış birleşimler kullanın.',
              code: `type GetirState<T> =
  | { durum: 'bosta' }
  | { durum: 'yukleniyor' }
  | { durum: 'basarili'; veri: T }
  | { durum: 'hata'; hata: string };

function VeriGetirici() {
  const [state, stateAyarla] = useState<GetirState<Kullanici>>({
    durum: 'bosta'
  });

  if (state.durum === 'basarili') {
    // TypeScript state.veri'nin var olduğunu bilir
    return <div>{state.veri.isim}</div>;
  }

  if (state.durum === 'hata') {
    // TypeScript state.hata'nın var olduğunu bilir
    return <div>Hata: {state.hata}</div>;
  }

  return <div>Yükleniyor...</div>;
}`,
            },
            {
              name: 'SALT OKUNUR STATE',
              description: 'State objelerinin yanlışlıkla değiştirilmesini önlemek için Readonly<T> kullanın.',
              code: `interface UygulamaAyarlari {
  tema: 'acik' | 'karanlik';
  apiUrl: string;
  ozellikler: string[];
}

function Uygulama() {
  const [ayarlar, ayarlarAyarla] = useState<Readonly<UygulamaAyarlari>>({
    tema: 'karanlik',
    apiUrl: 'https://api.ornek.com',
    ozellikler: ['arama', 'analitik']
  });

  const temaGuncelle = (tema: 'acik' | 'karanlik') => {
    ayarlarAyarla({ ...ayarlar, tema }); // Spread yeni obje oluşturur
  };

  return <div>Tema: {ayarlar.tema}</div>;
}`,
            },
          ],
        },
        mistakes: {
          title: 'STATE TİP HATALARI',
          items: [
            {
              title: 'Doğrudan State Değiştirme',
              description:
                'State\'i asla doğrudan değiştirmeyin. Her zaman güncellenmiş değerlerle yeni objeler/diziler oluşturun.',
              wrong: `const [kullanici, kullaniciAyarla] = useState<Kullanici>({ isim: 'Ahmet', yas: 25 });

// YANLIŞ: Doğrudan değiştirme
kullanici.yas = 26;
kullaniciAyarla(kullanici); // React değişikliği algılamaz

// YANLIŞ: Dizi değiştirme
const [ögeler, ögelerAyarla] = useState<string[]>(['a', 'b']);
ögeler.push('c');
ögelerAyarla(ögeler);`,
              right: `const [kullanici, kullaniciAyarla] = useState<Kullanici>({ isim: 'Ahmet', yas: 25 });

// DOĞRU: Yeni obje oluştur
kullaniciAyarla({ ...kullanici, yas: 26 });

// DOĞRU: Yeni dizi oluştur
const [ögeler, ögelerAyarla] = useState<string[]>(['a', 'b']);
ögelerAyarla([...ögeler, 'c']);`,
            },
          ],
        },
      },
      playground: {
        code: `// useState<T> generic simülasyonu
interface State<T> {
  deger: T;
}

function stateOlustur<T>(baslangicDegeri: T): State<T> {
  return { deger: baslangicDegeri };
}

// Generic useState simülasyonu
function useState<T>(baslangic: T): [T, (yeniDeger: T) => void] {
  let state = baslangic;

  const stateAyarla = (yeniDeger: T) => {
    state = yeniDeger;
    customConsole.log("State güncellendi:", JSON.stringify(yeniDeger, null, 2));
  };

  return [state, stateAyarla];
}

// Kullanım örnekleri
const [sayi, sayiAyarla] = useState<number>(0);
customConsole.log("Başlangıç sayısı:", sayi);
sayiAyarla(5);
sayiAyarla(10);

interface Kullanici {
  isim: string;
  yas: number;
}

const [kullanici, kullaniciAyarla] = useState<Kullanici>({ isim: "Ayşe", yas: 25 });
customConsole.log("Başlangıç kullanıcısı:", JSON.stringify(kullanici, null, 2));
kullaniciAyarla({ isim: "Mehmet", yas: 30 });`,
        title: 'useState<T> Generic Simülasyonu',
        description: 'useState ile TypeScript generic\'lerini anlayın',
      },
    },
    {
      id: 'hooks',
      title: 'HOOKS<T>',
      emoji: '🪝',
      subtitle: 'React Hooks ekosistemi için gelişmiş TypeScript desenleri',
      level: 4,
      color: '#F38181',
      sections: {
        theory: {
          title: 'HOOKS NEDEN TİPLENDİRİLMELİ?',
          content: [
            'Tiplendirilmiş hook\'lar yan etkiler, ref\'ler ve yaşam döngüsü davranışı hakkında derleme zamanı garantileri sağlar. TypeScript, hook\'ları React kurallarına göre doğru kullandığınızdan emin olur.',
            'TypeScript generic\'leri ile özel hook\'lar, bileşen ağacınız boyunca tam tip güvenliğini korurken farklı veri tiplerinde yeniden kullanılabilir hale gelir.',
            'useEffect bağımlılıkları tip kontrol edilir: TypeScript, bağımlılıklar eksik olduğunda veya closure\'larda eski değerler kullandığınızda uyarır.',
            'useRef<T>, DOM ref\'leri ile değer ref\'lerini ayırt eder, DOM element ref\'lerine değer atama gibi yaygın hataları önler.',
          ],
        },
        code: {
          title: 'REACT HOOKS TİPLENDİRME',
          description:
            'React hook\'ları tip güvenliği sağlamak için TypeScript generic\'lerini kullanır. Her hook\'un doğru kullanımı sağlayan ve güçlü tip çıkarımını mümkün kılan özel tipleme desenleri vardır.',
          example: `import { useState, useEffect, useRef, useMemo, useCallback } from 'react';

// Tiplendirilmiş bağımlılıklarla useEffect
function KullaniciProfili({ kullaniciId }: { kullaniciId: number }) {
  const [kullanici, kullaniciAyarla] = useState<Kullanici | null>(null);

  useEffect(() => {
    fetch(\`/api/kullanicilar/\${kullaniciId}\`)
      .then(yanit => yanit.json())
      .then((veri: Kullanici) => kullaniciAyarla(veri));

    // Düzgün tipleme ile temizleme fonksiyonu
    return () => {
      console.log('Kullanıcı için temizleme', kullaniciId);
    };
  }, [kullaniciId]); // TypeScript bağımlılıkları doğrular

  return kullanici ? <div>{kullanici.isim}</div> : null;
}

// DOM elementleri için useRef<T>
function OdakInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // TypeScript inputRef.current\'in null olabileceğini bilir
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} />;
}

// Değişken değerler için useRef<T>
function Zamanlayici() {
  const aralikRef = useRef<number | null>(null);

  useEffect(() => {
    aralikRef.current = window.setInterval(() => {
      console.log('Tik');
    }, 1000);

    return () => {
      if (aralikRef.current) {
        clearInterval(aralikRef.current);
      }
    };
  }, []);

  return <div>Zamanlayıcı çalışıyor...</div>;
}

// Tip çıkarımı ile useMemo
function PahaliComponent({ ögeler }: { ögeler: number[] }) {
  const siralanmisOgeler = useMemo<number[]>(() => {
    return ögeler.sort((a, b) => a - b);
  }, [ögeler]);

  return <div>{siralanmisOgeler.join(', ')}</div>;
}

// Tiplendirilmiş parametrelerle useCallback
function AramaComponent() {
  const [sorgu, sorguAyarla] = useState('');

  const aramaIsle = useCallback((aramaTerimi: string) => {
    console.log('Aranıyor:', aramaTerimi);
    sorguAyarla(aramaTerimi);
  }, []);

  return <AramaInput onAra={aramaIsle} />;
}`,
        },
        typescript: {
          title: 'GELİŞMİŞ HOOK DESENLERİ',
          items: [
            {
              name: 'ÖZEL HOOKS',
              description: 'Tam TypeScript desteği ve generic\'lerle yeniden kullanılabilir özel hook\'lar oluşturun.',
              code: `// Generic özel hook
function useYerelDepolama<T>(anahtar: string, baslangicDegeri: T) {
  const [deger, degerAyarla] = useState<T>(() => {
    const depolanan = localStorage.getItem(anahtar);
    return depolanan ? JSON.parse(depolanan) : baslangicDegeri;
  });

  useEffect(() => {
    localStorage.setItem(anahtar, JSON.stringify(deger));
  }, [anahtar, deger]);

  return [deger, degerAyarla] as const;
}

// Tip çıkarımı ile kullanım
function Ayarlar() {
  const [tema, temaAyarla] = useYerelDepolama<'acik' | 'karanlik'>('tema', 'acik');
  return <div>Tema: {tema}</div>;
}`,
            },
          ],
        },
        mistakes: {
          title: 'HOOK TİP HATALARI',
          items: [
            {
              title: 'Hook\'ları Koşullu Çağırma',
              description:
                'Hook\'lar her render\'da aynı sırada çağrılmalıdır. Hook\'ları asla döngülerin, koşulların veya iç içe fonksiyonların içinde çağırmayın.',
              wrong: `function Profil({ kullaniciId }: { kullaniciId: number | null }) {
  if (kullaniciId) {
    // YANLIŞ! Hook koşullu çağrılıyor
    const [kullanici, kullaniciAyarla] = useState<Kullanici | null>(null);
  }

  return <div>...</div>;
}`,
              right: `function Profil({ kullaniciId }: { kullaniciId: number | null }) {
  // DOĞRU! Hook her zaman en üst seviyede
  const [kullanici, kullaniciAyarla] = useState<Kullanici | null>(null);

  if (!kullaniciId) {
    return <div>Kullanıcı ID gerekli</div>;
  }

  return <div>{kullanici?.isim}</div>;
}`,
            },
          ],
        },
      },
      playground: {
        code: `// Özel Hook Simülasyonu
function useSayac(baslangicDegeri: number = 0) {
  let sayi = baslangicDegeri;

  const arttir = () => {
    sayi++;
    customConsole.log("Sayı artırıldı:", sayi);
    return sayi;
  };

  const azalt = () => {
    sayi--;
    customConsole.log("Sayı azaltıldı:", sayi);
    return sayi;
  };

  const sifirla = () => {
    sayi = baslangicDegeri;
    customConsole.log("Sayı sıfırlandı:", sayi);
    return sayi;
  };

  return { sayi, arttir, azalt, sifirla };
}

// Hook kullanımını simüle et
const sayac = useSayac(10);

customConsole.log("Başlangıç sayısı:", sayac.sayi);
sayac.arttir();
sayac.arttir();
sayac.azalt();
sayac.sifirla();

// Tip güvenli özel hook deseni
interface AcKapatDonusu {
  deger: boolean;
  acKapat: () => void;
  acikYap: () => void;
  kapaliYap: () => void;
}

function useAcKapat(baslangic: boolean = false): AcKapatDonusu {
  let deger = baslangic;

  return {
    deger,
    acKapat: () => {
      deger = !deger;
      customConsole.log("Açık/kapalı:", deger);
    },
    acikYap: () => {
      deger = true;
      customConsole.log("Açık olarak ayarlandı");
    },
    kapaliYap: () => {
      deger = false;
      customConsole.log("Kapalı olarak ayarlandı");
    },
  };
}

const acKapat = useAcKapat(false);
customConsole.log("Açık/kapalı başlangıcı:", acKapat.deger);
acKapat.acKapat();
acKapat.acikYap();`,
        title: 'Özel Hooks Deseni',
        description: 'Tip güvenli özel React hook\'ları oluşturun ve kullanın',
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFCEB] text-[#2D2D2D]">
      <CodedexCursor />
      <CodedexNavbar activeSection={activeSection} onNavigate={setActiveSection} />

      <main>
        <CodedexHero />

        {lessons.map((lesson) => (
          <TurkceLesson key={lesson.id} {...lesson} />
        ))}

        <footer className="relative py-20 px-6 border-t-4 border-black bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-4 p-8 bg-[#FFE66D] border-4 border-black hard-shadow-lg">
                <Trophy className="size-16 text-[#2D2D2D]" />
                <div className="text-left">
                  <h2 className="pixel-font text-2xl text-[#2D2D2D] mb-2">GÖREV TAMAMLANDI!</h2>
                  <p className="text-lg text-gray-700 font-semibold">Tüm seviyeleri başardınız!</p>
                </div>
              </div>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerVictory}
              className="mb-12 px-10 py-5 bg-[#FF6B6B] border-4 border-black hard-shadow-lg hover:hard-shadow transition-all"
            >
              <span className="pixel-font text-sm text-white flex items-center gap-3">
                <Star className="size-6" />
                ZAFER KUTLAMASI
                <Star className="size-6" />
              </span>
            </motion.button>

            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="size-16 bg-[#4ECDC4] border-4 border-black flex items-center justify-center hard-shadow">
                  <span className="text-3xl">⚛️</span>
                </div>
                <span className="pixel-font text-2xl text-[#2D2D2D]">
                  REACT<span className="text-[#4ECDC4]">.TSX</span>
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              Retro oyun estetiği ile modern TypeScript. Profesyonel seviyede React geliştirme
              için derinlemesine Türkçe eğitim.
            </p>

            <div className="flex items-center justify-center gap-6 pixel-font text-xs text-gray-500">
              <span>© 2026 REACT.TSX</span>
              <span className="text-[#4ECDC4]">•</span>
              <span>TYPESCRIPT İLE</span>
              <span className="text-[#4ECDC4]">•</span>
              <span>CODEDEX'TEN İLHAM ALINDI</span>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2">
              {['#FFE66D', '#95E1D3', '#A8DADC', '#F38181', '#4ECDC4'].map((color, i) => (
                <motion.div
                  key={i}
                  className="size-6 border-4 border-black"
                  style={{ backgroundColor: color }}
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
