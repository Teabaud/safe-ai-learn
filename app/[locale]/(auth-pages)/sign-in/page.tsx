import { signInAction } from "@/app/[locale]/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

interface LoginProps {
  searchParams: Promise<Message>;
}

async function Login(props: LoginProps) {
  const searchParams = await props.searchParams;
  const t = await getTranslations("auth");

  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">{t("login")}</h1>
      <p className="text-sm text-foreground">
        {t("noAccount")}{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          {t("signup")}
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">{t("email")}</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">{t("password")}</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            {t("forgotPassword")}
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText={t("signingIn")} formAction={signInAction}>
          {t("login")}
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}

export default Login;
