import { useTranslations } from 'next-intl';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Globe, Brain, Target } from "lucide-react";
import { Link } from '@/i18n/routing';

const LandingPage = () => {
  const t = useTranslations('landing');

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            {t('hero.subtitle')}
          </p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/lessons">
                {t('hero.cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('mission.title')}</h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t('mission.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.languages.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.languages.description')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.interactive.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.interactive.description')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.progress.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.progress.description')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="mb-4">
                <Book className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.structured.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.structured.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('howItWorks.title')}</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step1.title')}</h3>
                  <p className="text-muted-foreground">{t('howItWorks.step1.description')}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step2.title')}</h3>
                  <p className="text-muted-foreground">{t('howItWorks.step2.description')}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step3.title')}</h3>
                  <p className="text-muted-foreground">{t('howItWorks.step3.description')}</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('howItWorks.step4.title')}</h3>
                  <p className="text-muted-foreground">{t('howItWorks.step4.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('cta.description')}
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/sign-up">
              {t('cta.button')} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
