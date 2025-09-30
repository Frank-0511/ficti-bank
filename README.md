# 📚 Arquitectura de proyecto con Next.js (Pages Router)

Este proyecto sigue una organización **feature-based** (por características) para mantener el código escalable, modular y fácil de mantener.

---

## 📂 Estructura de carpetas

```
/pages/                   # Next.js Pages Router (entrypoints)
 ├── _app.tsx             # Providers globales (Mantine, Zustand, etc.)
 ├── index.tsx            # → "/" importa HomePage
 ├── login.tsx            # → "/login" importa LoginPage
 └── register.tsx         # → "/register" importa RegisterPage

/features/                # Todo el código organizado por feature
 ├── home/
 │   ├── pages/           # Páginas específicas del feature
 │   │   └── Home.page.tsx
 │   ├── components/      # UI del feature (cards, modales, etc.)
 │   ├── hooks/           # Hooks específicos
 │   ├── services/        # Lógica de negocio del feature
 │   └── store/           # Estado local del feature (Zustand)
 │
 ├── auth/
 │   ├── pages/
 │   │   ├── Login.page.tsx
 │   │   └── Register.page.tsx
 │   ├── components/      # Ej: LoginForm, LogoutButton
 │   ├── services/        # Casos de uso de Auth (login, registro)
 │   └── store/           # Estado de Auth si fuera aislado (ej: modal login)
 │
 └── shared/              # Código reutilizable entre features
     ├── components/      # Botones, Layouts, NavBar, AuthGuard...
     ├── hooks/           # useAuth, useFetch...
     └── utils/           # helpers, formatters, constantes

/lib/                     # Infraestructura global
 ├── api.ts               # Cliente HTTP global (axios)
 ├── config.ts            # Configuración global
 ├── auth.ts              # Funciones globales de autenticación
 ├── validators.ts        # Validaciones comunes
 ├── logger.ts            # Logger centralizado
 └── store/               # Estado global (Zustand)
     ├── auth.store.ts    # Auth global
     └── theme.store.ts   # Modo oscuro/claro global

/styles/                  # Estilos globales
 └── globals.css

/theme.ts                 # Config de Mantine
/next.config.js
/package.json
```

---

## ⚡ Flujo recomendado

### `pages/`

* Solo define entrypoints (URLs).
* Reexporta los componentes de `features/`.

```tsx
// /pages/index.tsx
import HomePage from "@/features/home/pages/Home.page";
export default HomePage;
```

---

### `features/<feature>/services/`

* Implementa la **lógica de negocio del feature** usando `/lib`.

```ts
// /features/auth/services/auth.service.ts
import { api } from "@/lib/api";

export async function loginService(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
}
```

---

### `/lib`

* Contiene **infraestructura global** (no UI):

  * Cliente HTTP (axios)
  * Configuración global
  * Logger
  * Validadores
  * Estado global con Zustand

```ts
// /lib/store/auth.store.ts
import { create } from "zustand";

interface AuthState {
  user: { id: string; name: string } | null;
  token: string | null;
  login: (user: AuthState["user"], token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
```

---

### `features/shared/components`

* Contiene **UI reutilizable** que consume `/lib` o `services/`.

```tsx
// /features/shared/components/AuthGuard.tsx
import { useRouter } from "next/router";
import { useAuthStore } from "@/lib/store/auth.store";
import { ReactNode, useEffect } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  return <>{children}</>;
}
```

---

## 🎯 Reglas clave

1. **`/lib`** → Infraestructura y lógica global (no UI).
2. **`services/`** → Casos de uso de cada feature (usa `/lib`).
3. **`store/`** → Estado (Zustand). Global en `/lib/store`, específico dentro de cada feature.
4. **`components/`** → UI (global en `shared`, específicos en cada feature).
5. **`pages/`** → Solo entrypoints que importan `features`.

---

## ✅ Beneficios

* **Escalable**: cada feature está aislado.
* **Reutilizable**: UI y lógica desacopladas.
* **Profesional**: arquitectura clara, fácil de documentar y mantener.
* **Flexible**: soporta tanto estado global (auth, theme) como local (cart, home).
