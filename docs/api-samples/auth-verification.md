# Auth verification — 2026-11-03

Verified with curl against `https://ecommerce.routemisr.com/api/v1`, using `Content-Type: application/json`.

| Endpoint | JSON request fields | Success |
| --- | --- | --- |
| POST /auth/signin | email: string, password: string | 200 |
| POST /auth/signup | name: string, email: string, password: string, rePassword: string, phone: string | 201 |

Both successful responses contain `message: "success"`, `user: { name: string, email: string, role: string }`, and `token: string`. Tokens are redacted in the saved samples. No API response types were added.

Wrong credentials: HTTP 401, `{ "statusMsg": "fail", "message": "Incorrect email or password" }`.

Duplicate email: HTTP 409, `{ "statusMsg": "fail", "message": "Account Already Exists" }`.

Invalid input: HTTP 400, `{ "message": "fail", "errors": { "value": "submitted value (optional)", "msg": "validation message", "param": "field name", "location": "body" } }`. Password values are redacted in samples.

Fresh signup requests confirmed that six lowercase characters and eight lowercase characters succeed. Five characters fail with `must be at least 6 chars`. Name with two characters, invalid email, non-Egyptian phone numbers, and mismatched passwords fail validation. The API reports password mismatch against `password`; the form deliberately shows it under `rePassword`.

Other boundary probes used an existing email: HTTP 409 means validation reached duplicate-account handling; it does not prove account creation would succeed for every tested value. These observations do not describe every possible backend rule.

Form rules: valid email; required login password; register name at least three characters; register password at least six characters; Egyptian mobile phone matching `^01[0125]\d{8}$`; matching password confirmation. No complexity requirements are imposed by the strength meter. Eight characters, mixed case, a number, and a symbol each earn one point; scores 0/1 are Weak, 2 Fair, 3 Good, 4 Strong.

The dependencies were already installed: react-hook-form 7.91.0, @hookform/resolvers 7.0.2, zod 4.6.7. APIs were checked against the installed resolver README and https://github.com/react-hook-form/resolvers, https://zod.dev/api, and https://react-hook-form.com/docs/useform/watch.
