import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ForgotPasswordForm from "./_components/ForgotPasswordForm";
import RecoveryLayout from "./_components/RecoveryLayout";

export const metadata = { title: "Forgot your password?" };

export default function Page() {
  return (
    <RecoveryLayout
      step={1}
      title="Forgot Password?"
      description="No worries, we'll send you a reset code"
    >
      <ForgotPasswordForm />
      <Link
        href="/login"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-primary hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Sign In
      </Link>
      <p className="mt-9 border-t pt-6 text-center text-sm leading-6 text-muted-foreground">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Sign In
        </Link>
      </p>
    </RecoveryLayout>
  );
}
