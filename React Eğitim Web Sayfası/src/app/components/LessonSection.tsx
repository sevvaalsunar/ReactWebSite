import { ScrollReveal } from './ScrollReveal';
import { LessonCard } from './LessonCard';

export function LessonSection() {
  const lessons = [
    {
      title: 'JSX Nedir?',
      description: 'JavaScript içinde HTML yazmak',
      icon: '📝',
      bgColor: 'bg-gradient-to-br from-[var(--pastel-mint)]/60 to-[var(--pastel-blue)]/40',
      explanation:
        'JSX, JavaScript içinde HTML benzeri kod yazmanızı sağlar. React elementlerini oluşturmanın en kolay yoludur.',
      codeExample: `function Greeting() {
  const name = "Dünya";

  return (
    <div className="greeting">
      <h1>Merhaba, {name}!</h1>
      <p>JSX ile kod yazmak çok kolay.</p>
    </div>
  );
}

export default Greeting;`,
    },
    {
      title: 'Props',
      description: 'Bileşenler arası veri aktarımı',
      icon: '🎁',
      bgColor: 'bg-gradient-to-br from-[var(--pastel-lavender)]/60 to-[var(--pastel-pink)]/40',
      explanation:
        'Props (properties), bir üst bileşenden alt bileşene veri aktarmanın yoludur. Fonksiyon parametreleri gibi çalışır.',
      codeExample: `function UserCard({ name, age, role }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Yaş: {age}</p>
      <p>Rol: {role}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard
        name="Ahmet"
        age={25}
        role="Developer"
      />
      <UserCard
        name="Ayşe"
        age={28}
        role="Designer"
      />
    </div>
  );
}`,
    },
    {
      title: 'Componentler',
      description: 'Yeniden kullanılabilir UI parçaları',
      icon: '🧩',
      bgColor: 'bg-gradient-to-br from-[var(--pastel-blue)]/60 to-[var(--pastel-sand)]/40',
      explanation:
        'Componentler, UI\'nizi bağımsız ve yeniden kullanılabilir parçalara ayırmanızı sağlar. Her component kendi mantığına ve görünümüne sahiptir.',
      codeExample: `function Button({ text, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={\`btn btn-\${color}\`}
    >
      {text}
    </button>
  );
}

function App() {
  const handleClick = () => {
    alert('Butona tıklandı!');
  };

  return (
    <div>
      <Button
        text="Kaydet"
        onClick={handleClick}
        color="primary"
      />
      <Button
        text="İptal"
        onClick={handleClick}
        color="secondary"
      />
    </div>
  );
}`,
    },
    {
      title: 'Event Handling',
      description: 'Kullanıcı etkileşimlerini yönetme',
      icon: '⚡',
      bgColor: 'bg-gradient-to-br from-[var(--pastel-sand)]/60 to-[var(--pastel-peach)]/40',
      explanation:
        'React\'te event\'ler (olaylar), kullanıcı etkileşimlerini yakalamak için kullanılır. onClick, onChange gibi event handler\'lar ile yönetilir.',
      codeExample: `function InteractiveForm() {
  const [text, setText] = React.useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(\`Girilen metin: \${text}\`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Bir şeyler yazın..."
      />
      <button type="submit">Gönder</button>
      <p>Yazdığınız: {text}</p>
    </form>
  );
}`,
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Temel Konular</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              React'in temel yapı taşlarını keşfedin ve her birini derinlemesine öğrenin.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {lessons.map((lesson, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <LessonCard {...lesson} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
