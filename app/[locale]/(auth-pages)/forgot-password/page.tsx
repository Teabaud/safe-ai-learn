import { forgotPasswordAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { getTranslations } from "next-intl/server";

interface ForgotPasswordProps {
  searchParams: Promise<Message>;
}

async function ForgotPassword(props: ForgotPasswordProps) {
  const t  = await getTranslations("auth");
  const searchParams = await props.searchParams;
  
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto">
        <div>
          <h1 className="text-2xl font-medium">{t('resetPassword')}</h1>
          <p className="text-sm text-secondary-foreground">
            {t('haveAccount')}{" "}
            <Link className="text-primary underline" href="/sign-in">
              {t('login')}
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">{t('email')}</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            {t('resetPassword')}
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}

export default ForgotPassword;