import type { Metadata } from "next";
import { AddressesPanel } from "../_components/AddressesPanel";

export const metadata: Metadata = { title: "My Addresses | FreshCart" };

export default function AddressesPage() {
  return <AddressesPanel />;
}
