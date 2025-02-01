import { signUpAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";
import { getTranslations } from "next-intl/server";

interface SignupProps {
  searchParams: Promise<Message>;
}

async function Signup(props: SignupProps) {
  const t = await getTranslations("auth");
  const searchParams = await props.searchParams;
  
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">{t("signup")}</h1>
        <p className="text-sm text text-foreground">
          {t("haveAccount")}{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            {t("login")}
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">{t("email")}</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">{t("password")}</Label>
          <Input
            type="password"
            name="password"
            placeholder="********"
            minLength={6}
            required
          />
          <SubmitButton formAction={signUpAction} pendingText="{t('signingUp')}">
            {t("signup")}
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}

export default Signup;