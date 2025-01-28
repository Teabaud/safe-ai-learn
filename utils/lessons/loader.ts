export type Resource = {
  title: string;
  url: string;
};

export type LessonTranslation = {
  title: string;
  summary: string;
  resources: Resource[];
  questions: string[];
};

export type LessonContent = {
  id: string;
  translations: Record<string, LessonTranslation>;
};

export type Language = 'en' | 'fr';

export interface LessonComponentProps {
  currentLanguage?: Language;
}

export const getTranslatedText = (key: 'resources' | 'questions' | 'submitAnswer' | 'previousAnswers' | 'typeAnswer', currentLanguage: Language): string => {
    const translations: Record<Language, Record<typeof key, string>> = {
        en: {
        resources: 'Resources',
        questions: 'Questions',
        submitAnswer: 'Submit Answer',
        previousAnswers: 'Your Previous Answers:',
        typeAnswer: 'Type your answer here...'
        },
        fr: {
        resources: 'Ressources',
        questions: 'Questions',
        submitAnswer: 'Soumettre',
        previousAnswers: 'Vos réponses précédentes:',
        typeAnswer: 'Tapez votre réponse ici...'
        }
    };

    return translations[currentLanguage][key];
};


export const sampleLesson: LessonContent = {
    id: '1',
    translations: {
      en: {
        title: 'Introduction to AI Safety',
        summary: 'This lesson covers the fundamental concepts of AI safety...',
        resources: [
          { title: 'AI Safety Fundamentals', url: 'https://example.com/1' },
          { title: 'Technical AI Safety', url: 'https://example.com/2' }
        ],
        questions: [
          'What do you understand by AI alignment?',
          'How would you explain the concept of value learning?'
        ]
      },
      fr: {
        title: 'Introduction à la sécurité de l\'IA',
        summary: 'Cette leçon couvre les concepts fondamentaux...',
        resources: [
          { title: 'Fondamentaux de la sécurité de l\'IA', url: 'https://example.com/1' },
          { title: 'Sécurité technique de l\'IA', url: 'https://example.com/2' }
        ],
        questions: [
          'Que comprenez-vous par alignement de l\'IA ?',
          'Comment expliqueriez-vous le concept d\'apprentissage des valeurs ?'
        ]
      }
    }
  };