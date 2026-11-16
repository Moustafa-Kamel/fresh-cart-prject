"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addAccountAddress } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type AddressValues, addressSchema } from "@/lib/validations/account";

export function AddAddressForm() {
  const [open, setOpen] = useState(false);
  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { name: "", details: "", phone: "", city: "" },
  });
  async function submit(values: AddressValues) {
    try {
      const result = await addAccountAddress(values);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      form.reset();
      setOpen(false);
    } catch {
      toast.error("Unable to add address. Please try again.");
    }
  }
  return (
    <div className="mb-6">
      <Button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="add-address-form"
        className="h-11 gap-2 rounded-xl px-5 cursor-pointer"
      >
        <Plus aria-hidden="true" />
        {open ? "Close form" : "Add Address"}
      </Button>
      {open && (
        <form
          id="add-address-form"
          noValidate
          onSubmit={form.handleSubmit(submit)}
          className="mt-4 space-y-4 rounded-2xl border bg-card p-5 shadow-card"
        >
          <h3 className="font-semibold">New delivery address</h3>
          <fieldset
            disabled={form.formState.isSubmitting}
            className="grid gap-4 sm:grid-cols-2"
          >
            {(
              [
                {
                  id: "name",
                  label: "Address name",
                  placeholder: "Home or work",
                  autoComplete: "off",
                },
                {
                  id: "details",
                  label: "Address details",
                  placeholder: "Street, building and apartment",
                  autoComplete: "street-address",
                },
                {
                  id: "phone",
                  label: "Phone number",
                  placeholder: "01xxxxxxxxx",
                  autoComplete: "tel",
                },
                {
                  id: "city",
                  label: "City",
                  placeholder: "Enter city",
                  autoComplete: "address-level2",
                },
              ] as const
            ).map(({ id, label, ...props }) => (
              <div key={id} className="space-y-2">
                <label
                  htmlFor={`address-${id}`}
                  className="text-sm text-muted-foreground"
                >
                  {label}
                </label>
                <Input
                  id={`address-${id}`}
                  type={id === "phone" ? "tel" : "text"}
                  {...props}
                  {...form.register(id)}
                  aria-invalid={Boolean(form.formState.errors[id])}
                  aria-describedby={
                    form.formState.errors[id]
                      ? `address-${id}-error`
                      : undefined
                  }
                />
                {form.formState.errors[id] && (
                  <p
                    id={`address-${id}-error`}
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {form.formState.errors[id]?.message}
                  </p>
                )}
              </div>
            ))}
          </fieldset>
          <div className="flex gap-3">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving…" : "Save Address"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={form.formState.isSubmitting}
              onClick={() => {
                form.reset();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
