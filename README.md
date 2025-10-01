# 🏦 Ficti Bank - Arquitectura de proyecto con Next.js

Sistema integral de gestión bancaria construido con **Next.js (Pages Router)**, **Mantine UI**, **TypeScript**, y **arquitectura feature-based** para máxima escalabilidad y mantenibilidad.

---

## 🚀 Stack Tecnológico

- **Framework**: Next.js 14 (Pages Router)
- **UI Library**: Mantine 7
- **Styling**: CSS Modules + PostCSS
- **State Management**: Zustand + TanStack Query
- **Testing**: Jest + React Testing Library
- **TypeScript**: Strict mode
- **Linting**: ESLint + Prettier + Stylelint

---

## 📂 Estructura de carpetas

```
/pages/                   # 🚪 Next.js Pages Router (entrypoints)
 ├── _app.tsx             # Providers globales (Mantine, Zustand, etc.)
 ├── _document.tsx        # Document HTML personalizado
 └── index.tsx            # → "/" importa HomePage

/features/                # 🎯 Código organizado por feature
 ├── home/
 │   ├── index.ts         # Barrel exports del feature
 │   ├── pages/           # Páginas específicas
 │   │   ├── Home.page.tsx
 │   │   └── Home.module.css
 │   └── components/      # UI específica del feature
 │       ├── HeroSection/
 │       ├── FeaturesSection/
 │       └── ServicesSection/
 │
 └── auth/                # 🔐 Feature de autenticación (futuro)
     ├── components/
     │   ├── LoginModal/
     │   └── RegisterModal/
     ├── hooks/           # useLoginModal, useRegisterModal
     └── services/        # Lógica de negocio de Auth

/shared/                  # 🔄 Código reutilizable entre features
 └── components/          # UI components globales
     ├── Header/
     ├── Footer/
     ├── Navbar/
     ├── ColorSchemeToggle/
     └── index.ts         # Barrel exports

/lib/                     # 📚 Infraestructura y utilidades
 ├── index.ts             # Barrel exports principal
 ├── hooks/               # Hooks reutilizables
 │   ├── index.ts
 │   └── useScrolled.ts
 ├── theme/               # Configuración de Mantine
 │   ├── index.ts
 │   └── theme.ts
 └── utils/               # Utilidades globales (futuro)

/styles/                  # 🎨 Estilos globales
 └── globals.css          # Variables CSS, transiciones globales

/types/                   # 📝 Definiciones TypeScript
 ├── mantine.d.ts         # Extensiones de tipos Mantine
 └── [feature].d.ts       # Tipos específicos por feature

/test-utils/              # 🧪 Utilidades de testing
 ├── index.ts
 └── render.tsx           # Custom render con providers

/public/                  # 📁 Assets estáticos
/__mocks__/               # 🎭 Mocks para testing
/coverage/                # 📊 Reportes de cobertura
```

---

## ⚡ Patrones y Convenciones

### 🎯 **Barrel Exports**
Todos los módulos usan barrel exports para imports limpios:

```tsx
// ✅ Imports limpios
import { Header, Footer, Navbar } from '@/shared/components';
import { useScrolled } from '@/lib/hooks';
import { theme } from '@/lib/theme';

// ❌ Evitar
import { Header } from '@/shared/components/Header/Header';
```

### 🎨 **CSS Modules**
Cada componente tiene su propio archivo CSS Module:

```tsx
// Header.tsx
import styles from './Header.module.css';

export function Header() {
  return <div className={styles.container}>...</div>;
}
```

### 🌓 **Tema y Variables CSS**
- **Configuración Mantine**: `lib/theme/theme.ts`
- **Variables CSS**: `styles/globals.css`
- **Transiciones globales**: Aplicadas automáticamente

### 🧪 **Testing Strategy**
- **Unit Tests**: Cada componente tiene su `.test.tsx`
- **Coverage**: Objetivo 100% en componentes críticos
- **Test Utils**: Custom render con providers en `test-utils/`

---

## 🚀 Flujo recomendado

### **1. Pages Router**
Solo define entrypoints que importan de features:

```tsx
// pages/index.tsx
import { HomePage } from '@/features/home';
export default HomePage;
```

### **2. Feature Development**
Cada feature es auto-contenido:

```tsx
// features/home/components/HeroSection/HeroSection.tsx
import { useScrolled } from '@/lib/hooks';
import styles from './HeroSection.module.css';

export function HeroSection() {
  const isScrolled = useScrolled();
  return <section className={styles.hero}>...</section>;
}
```

### **3. Shared Components**
UI reutilizable entre features:

```tsx
// shared/components/Header/Header.tsx
import { useScrolled } from '@/lib/hooks';
import { ColorSchemeToggle } from '../ColorSchemeToggle';

export function Header() {
  // Lógica compartida
}
```

### **4. Lib Utilities**
Hooks y utilidades reutilizables:

```tsx
// lib/hooks/useScrolled.ts
export function useScrolled(threshold = 50): boolean {
  // Lógica del hook
}
```

---

## 🎯 Reglas de Arquitectura

### ✅ **DO's**
1. **Barrel exports** en cada carpeta con `index.ts`
2. **CSS Modules** para estilos de componentes
3. **TypeScript strict** para type safety
4. **Testing** cada componente público
5. **Features auto-contenidos** con minimal dependencies
6. **Hooks personalizados** en `lib/hooks/`

### ❌ **DON'Ts**
1. No imports directos sin barrel exports
2. No CSS global para componentes específicos
3. No lógica de negocio en componentes UI
4. No state management para UI simple (usar `useDisclosure`)
5. No duplicar código entre features

---

## 📊 Métricas de Calidad

- **TypeScript**: Strict mode, 0 `any` types
- **Testing**: 100% coverage en componentes críticos
- **Linting**: ESLint + Prettier + Stylelint
- **Performance**: Lazy loading, Code splitting
- **Accessibility**: ARIA labels, keyboard navigation

---

## 🛠️ Scripts de Desarrollo

```bash
# Desarrollo
pnpm dev

# Testing
pnpm test              # Run todos los tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Con coverage

# Linting
pnpm lint              # ESLint + Stylelint
pnpm prettier:check    # Format check
pnpm typecheck         # TypeScript check

# Build
pnpm build
pnpm start
```

---

## 🏗️ Próximas Implementaciones

- [ ] **Auth Feature**: Login/Register modals con Zustand
- [ ] **TanStack Query**: Data fetching y caching
- [ ] **API Layer**: Cliente HTTP centralizado
- [ ] **Form Validation**: Zod + React Hook Form
- [ ] **Storybook**: Component documentation
- [ ] **E2E Testing**: Playwright integration

---

## 🤝 Contribución

1. **Feature Branch**: `git checkout -b feature/nueva-funcionalidad`
2. **Commits**: Usar conventional commits
3. **Testing**: Mantener 100% coverage
4. **Review**: PR con al menos 1 reviewer
5. **Merge**: Squash and merge

---

## 📖 Documentación Técnica

- **Mantine**: [mantine.dev](https://mantine.dev)
- **Next.js**: [nextjs.org](https://nextjs.org)
- **Testing**: [testing-library.com](https://testing-library.com)
- **TypeScript**: [typescriptlang.org](https://typescriptlang.org)
