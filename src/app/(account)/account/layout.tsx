import { UserRound } from "lucide-react";
import { Toaster } from "sonner";
import { PageHero } from "@/components/shared/PageHero";
import { AccountNav } from "./_components/AccountNav";

export default function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <PageHero
        title="My Account"
        subtitle="Manage your addresses and account settings"
        breadcrumbItems={[{ label: "My Account" }]}
        icon={<UserRound />}
      />
      <div className="container grid min-h-96 gap-8 px-4 py-8 md:grid-cols-[16rem_minmax(0,1fr)] lg:px-8">
        <AccountNav />
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
