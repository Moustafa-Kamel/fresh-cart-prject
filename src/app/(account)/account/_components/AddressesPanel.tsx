import { Building2, MapPin, Phone } from "lucide-react";
import { auth } from "@/auth";
import { getLoggedUserAddresses } from "@/lib/api/user";
import { getStoreToken } from "@/lib/auth/storeToken";
import { AddAddressForm } from "./AddAddressForm";
import { RemoveAddressButton } from "./RemoveAddressButton";

export async function AddressesPanel() {
  const session = await auth();
  if (!session?.user?.email) return null;
  const token = await getStoreToken(session.user.email);
  const { data: addresses } = await getLoggedUserAddresses(token);
  return (
    <section aria-labelledby="addresses-heading">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="addresses-heading" className="text-xl font-bold">
            My Addresses
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your saved delivery addresses
          </p>
        </div>
      </div>
      <AddAddressForm />
      {addresses.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {addresses.map((address) => (
            <article
              key={address._id}
              className="flex items-start gap-4 rounded-2xl border bg-card p-5 shadow-card"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <MapPin aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <h3 className="wrap-break-word font-semibold">
                  {address.name}
                </h3>
                <p className="wrap-break-word text-sm text-muted-foreground">
                  {address.details}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Phone aria-hidden="true" className="size-3" />
                    {address.phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <Building2 aria-hidden="true" className="size-3" />
                    {address.city}
                  </span>
                </div>
              </div>
              <RemoveAddressButton id={address._id} name={address.name} />
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-card px-6 py-12 text-center shadow-card">
          <MapPin aria-hidden="true" className="size-8 text-primary" />
          <h3 className="font-semibold">No saved addresses yet</h3>
          <p className="text-sm text-muted-foreground">
            Your saved delivery addresses will appear here.
          </p>
        </div>
      )}
    </section>
  );
}
