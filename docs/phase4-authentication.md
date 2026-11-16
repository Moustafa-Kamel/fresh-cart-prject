# Phase 4 authentication

## Implementation

- Server Actions and shared Zod validation: `src/actions/auth.ts`, `src/lib/validations/auth.ts`.
- API wrappers: `src/lib/api/auth.ts`. Forgot-password uses the owner's response type; verify/reset discard unused bodies with `Promise<void>`.
- Auth.js Credentials/JWT: `src/lib/authjs/authjs.ts` (existing owner configuration retained).
- Recovery cookie: `src/lib/auth/recovery.ts` (encrypted, HTTP-only, ten-minute lifetime).
- Route protection: `src/proxy.ts`, `src/app/(account)/layout.tsx`.
- Login: `src/app/(auth)/login/page.tsx`, `src/app/(auth)/login/_components/LoginForm.tsx`.
- Registration metadata: `src/app/(auth)/register/page.tsx`; existing registration form retained.
- Recovery pages and forms: `src/app/(auth)/forgot-password/`, `src/app/(auth)/verify-code/`, `src/app/(auth)/reset-password/`. Verify/reset include loading and error boundaries.
- Navbar: `src/components/layout/Navbar.tsx`, `src/components/layout/TopbarAccount.tsx`. Public pages avoid a server-side session read in the Navbar; account controls use the existing SessionProvider.
- Development logging: `next.config.ts` disables default Server Function argument logging to keep passwords out of terminal logs.
- Documentation: `docs/PROJECT_STRUCTURE.md`, `docs/api-notes.md`, this file, and the three new recovery API failure samples in `docs/api-samples/`.

## Manual verification

1. Open `/cart?source=test` while signed out. Expect login with a callback URL. Register a fresh account, then sign in. Verify the Navbar shows your name. Reload and confirm the session persists.
2. Sign out with the Navbar or mobile menu. Open `/cart`, `/wishlist`, `/checkout`, `/orders`, `/account`, and a nested account URL; expect login. The later-phase pages may still be absent after authentication.
3. Open `/forgot-password` and submit an empty/invalid email, then a nonexistent account email. Expect validation and API errors. Direct visits to `/verify-code` or `/reset-password` without recovery state return to forgot-password.
4. With a registered account you control, request a code, enter an incorrect code, then the emailed code. Submit mismatched passwords, then matching passwords. Expect return to login; the old password should fail and the new one should work.
5. Repeat the forms at 375, 768, and 1280 pixels. Verify keyboard focus, pending buttons, inline errors, and mobile account controls.

## Executed checks

Real Chrome against the live API passed: registration, login through the Server Action, session after reload, authenticated cart access, anonymous cart redirect with query preservation, signed-in auth-page redirect, Navbar sign-out, and protection after sign-out. The session response contains no backend credential token and the cookie is HTTP-only. Login had no horizontal overflow at 375/768/1280.

Recovery checks passed: invalid email validation, live nonexistent-email error display, and server-side step guards. Curl samples confirm invalid code and nonexistent-email reset behavior. Update (2026-11-16): the owner confirmed successful recovery email delivery and code verification; that issue is resolved. Successful password reset verified by the owner on.

Full lint is currently blocked by pre-existing formatting in `src/app/contact/page.tsx` and the owner-edited `src/types/user.ts`. Auth files pass targeted Biome checks. Type checking passed. The final production build passed and confirms ISR for Home (60 seconds), Brands and Categories (one hour).

## What to learn

- Client validation improves feedback; Server Actions repeat validation because browser input cannot be trusted (`src/actions/auth.ts`).
- The Auth.js JWT contains the backend token, while the browser-visible session contains only public user details (`src/lib/authjs/authjs.ts`).
- Proxy redirects improve navigation, while server-side checks enforce access; recovery actions also check encrypted state before allowing each step (`src/proxy.ts`, `src/lib/auth/recovery.ts`).

## Follow-up audit — 2026-11-07

- All three recovery pages use the same `RecoveryLayout` left panel and step indicator; their right panels follow the local recovery designs. Password fields include independent visibility controls.
- `resendCodeAction` reads the email from the encrypted recovery cookie and reuses the forgot-password action. The verification form now resends directly and displays pending, success, and error feedback.
- Repeated live browser verification passed: registration, login, safe public session, session persistence after reload, authenticated cart access, signed-in auth-page redirect, HTTP-only session cookie, Navbar sign-out, and anonymous cart protection with query preservation.
- Recovery guards, invalid email validation, and the live nonexistent-email error passed. Recovery layouts were checked at 375/768/1280; reset-password validation and the visibility toggle passed. Update (2026-11-16): the owner confirmed successful recovery email delivery and code verification; that issue is resolved. Resend delivery and successful password reset remain unverified.
- Targeted lint passed for 24 authentication files; `npx tsc --noEmit` passed. Full lint still reports existing formatting in `src/app/contact/page.tsx` and owner-managed `src/types/user.ts`; neither file was changed.
- Default Turbopack production builds failed when a worker tried to bind a port, including a retry with elevated permissions. `npm run build -- --webpack` passed. No build configuration was changed. Phase 4 is not marked complete while these checks remain outstanding.
