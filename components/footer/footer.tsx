import { useTranslations } from 'next-intl'
import { Github, Mail } from 'lucide-react'

function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} SAIL. {t('rights')}
          </p>
        </div>
        <div className="flex items-center space-x-4">
         <a 
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`} 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            aria-label={t('contactAriaLabel')}
          >
            <Mail className="h-4 w-4" />
            <span>{t('contact')}</span>
          </a>
          <a
            href="https://github.com/Teabaud/safe-ai-learn"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;