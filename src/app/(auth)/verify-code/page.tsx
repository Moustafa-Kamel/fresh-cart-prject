import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getRecovery } from "@/lib/auth/recovery";
import RecoveryLayout from "../forgot-password/_components/RecoveryLayout";
import VerifyCodeForm from "./_components/VerifyCodeForm";

export const metadata = { title: "Check your email" };

export default async function Page() {
  const recovery = await getRecovery();
  if (!recovery) redirect("/forgot-password");
  return (
    <RecoveryLayout
      step={2}
      title="Check Your Email"
      description={<>Enter the 6-digit code sent to {recovery.email}</>}
    >
      <VerifyCodeForm />
      <Link
        href="/forgot-password"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Change email address
      </Link>
    </RecoveryLayout>
  );
}
