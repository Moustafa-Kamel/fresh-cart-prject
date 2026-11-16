import { redirect } from "next/navigation";
import { getRecovery } from "@/lib/auth/recovery";
import RecoveryLayout from "../forgot-password/_components/RecoveryLayout";
import ResetPasswordForm from "./_components/ResetPasswordForm";

export const metadata = { title: "Choose a new password" };

export default async function Page() {
  const recovery = await getRecovery();
  if (!recovery) redirect("/forgot-password");
  if (!recovery.verified) redirect("/verify-code");
  return (
    <RecoveryLayout
      step={3}
      title="Create New Password"
      description="Your new password must be different from previous passwords"
    >
      <ResetPasswordForm />
    </RecoveryLayout>
  );
}
