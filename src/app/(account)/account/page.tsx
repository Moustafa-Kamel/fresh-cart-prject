import type { Metadata } from "next";
import SettingsPage from "./settings/page";

export const metadata: Metadata = { title: "My Account | FreshCart" };

export default function AccountPage() {
  return <SettingsPage />;
}
