export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Intelligence Artificielle & ML',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'NLP & LLMs (LangChain)', level: 90 },
      { name: 'TensorFlow / Keras', level: 85 },
      { name: 'PyTorch', level: 80 },
      { name: 'MLOps (MLflow)', level: 85 },
      { name: 'Scikit-learn', level: 90 },
    ]
  },
  {
    title: 'Big Data & Cloud',
    skills: [
      { name: 'Apache Spark', level: 85 },
      { name: 'Apache Airflow', level: 80 },
      { name: 'Apache Kafka', level: 75 },
      { name: 'Hadoop HDFS', level: 75 },
      { name: 'Docker', level: 90 },
      { name: 'PostgreSQL / MongoDB', level: 85 },
    ]
  },
  {
    title: 'Développement Web & Mobile',
    skills: [
      { name: 'FastAPI / Flask', level: 90 },
      { name: 'React Native', level: 80 },
      { name: 'TypeScript / JS', level: 85 },
      { name: 'HTML / CSS / Tailwind', level: 90 },
      { name: 'Django', level: 75 },
    ]
  },
  {
    title: 'Outils & Autres',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Jenkins (CI/CD)', level: 80 },
      { name: 'Figma', level: 75 },
      { name: 'Linux / Bash', level: 85 },
      { name: 'Cisco CCNA (Réseaux)', level: 70 },
    ]
  }
];

export const allSkillsList = skillCategories.flatMap(c => c.skills.map(s => s.name));
