"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Save, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { changeAccountPassword, saveAccountProfile } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type ChangePasswordValues,
  changePasswordSchema,
  type ProfileValues,
  profileSchema,
} from "@/lib/validations/account";
import { PasswordField } from "./PasswordField";

export function SettingsForms({
  name,
  email,
  userId,
  role,
}: {
  name: string;
  email: string;
  userId: string;
  role: string;
}) {
  const router = useRouter();
  const { update } = useSession();
  const profile = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name, email, phone: "" },
  });
  const password = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", rePassword: "" },
  });
  async function submitProfile(values: ProfileValues) {
    try {
      const result = await saveAccountProfile(values);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      await update();
      toast.success(result.message);
      router.push("/login?callbackUrl=%2Faccount");
      router.refresh();
    } catch {
      toast.error("Unable to save profile. Please try again.");
    }
  }
  async function submitPassword(values: ChangePasswordValues) {
    try {
      const result = await changeAccountPassword(values);
      if (!result.ok) {
        toast.error(result.message);
        return;
      }
      password.reset();
      await update();
      toast.success(result.message);
      router.push("/login?callbackUrl=%2Faccount");
      router.refresh();
    } catch {
      toast.error("Unable to change password. Please try again.");
    }
  }
  return (
    <section aria-labelledby="settings-heading" className="space-y-6">
      <div>
        <h2 id="settings-heading" className="text-xl font-bold">
          Account Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your profile information and change your password
        </p>
      </div>
      <section
        aria-labelledby="profile-heading"
        className="overflow-hidden rounded-2xl border bg-card shadow-card"
      >
        <form
          noValidate
          onSubmit={profile.handleSubmit(submitProfile)}
          className="space-y-6 p-5 sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
              <UserRound aria-hidden="true" className="size-6" />
            </span>
            <div>
              <h3 id="profile-heading" className="font-bold">
                Profile Information
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Update your personal details.
              </p>
            </div>
          </div>
          {[
            {
              id: "name" as const,
              label: "Full Name",
              type: "text",
              placeholder: "Enter your full name",
              autoComplete: "name",
            },
            {
              id: "email" as const,
              label: "Email Address",
              type: "email",
              placeholder: "Enter your email",
              autoComplete: "email",
            },
            {
              id: "phone" as const,
              label: "Phone Number",
              type: "tel",
              placeholder: "01xxxxxxxxx",
              autoComplete: "tel",
            },
          ].map(({ id, label, ...props }) => (
            <div key={id} className="space-y-2">
              <label htmlFor={id} className="text-sm text-muted-foreground">
                {label}
              </label>
              <Input
                id={id}
                {...profile.register(id)}
                aria-invalid={Boolean(profile.formState.errors[id])}
                aria-describedby={`${id}-error`}
                {...props}
                className="h-12 rounded-xl bg-background px-4"
              />
              {profile.formState.errors[id] && (
                <p
                  id={`${id}-error`}
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {profile.formState.errors[id]?.message}
                </p>
              )}
            </div>
          ))}
          <Button
            type="submit"
            disabled={profile.formState.isSubmitting}
            className="h-12 gap-2 rounded-xl px-6 cursor-point"
          >
            <Save aria-hidden="true" />
            {profile.formState.isSubmitting ? "Saving…" : "Save Changes"}
          </Button>
        </form>
        <div className="space-y-4 border-t bg-muted/50 p-5 sm:p-8">
          <h3 className="font-semibold">Account Information</h3>
          <dl className="space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between gap-4">
              <dt>User ID</dt>
              <dd>{userId}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Role</dt>
              <dd>{role}</dd>
            </div>
          </dl>
        </div>
      </section>
      <form
        noValidate
        onSubmit={password.handleSubmit(submitPassword)}
        aria-labelledby="password-heading"
        className="space-y-6 rounded-2xl border bg-card p-5 shadow-card sm:p-8"
      >
        <div className="flex items-center gap-4">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-deal-muted text-deal">
            <LockKeyhole aria-hidden="true" className="size-6" />
          </span>
          <div>
            <h3 id="password-heading" className="font-bold">
              Change Password
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your account password.
            </p>
          </div>
        </div>
        <PasswordField
          id="current-password"
          registration={password.register("currentPassword")}
          error={password.formState.errors.currentPassword?.message}
          label="Current Password"
          placeholder="Enter your current password"
          autoComplete="current-password"
        />
        <PasswordField
          id="new-password"
          registration={password.register("newPassword")}
          error={password.formState.errors.newPassword?.message}
          label="New Password"
          placeholder="Enter your new password"
          autoComplete="new-password"
          hint="Must be at least 6 characters"
        />
        <PasswordField
          id="confirm-password"
          registration={password.register("rePassword")}
          error={password.formState.errors.rePassword?.message}
          label="Confirm New Password"
          placeholder="Confirm your new password"
          autoComplete="new-password"
        />
        <Button
          type="submit"
          disabled={password.formState.isSubmitting}
          className="h-12 gap-2 rounded-xl bg-deal px-6 text-primary-foreground hover:bg-deal/90"
        >
          <LockKeyhole aria-hidden="true" />
          {password.formState.isSubmitting ? "Updating…" : "Change Password"}
        </Button>
      </form>
    </section>
  );
}
