# Plataforma Clínica Digital — Dr. Gabriel Mena

Plataforma clínica premium para el Dr. Gabriel Ignacio Mena Bañados, médico general especializado en salud mental y medicina integrativa. Desarrollada con Next.js 15, TypeScript, TailwindCSS, Supabase y Framer Motion.

---

## Vista general

Una plataforma híbrida compuesta por:

- **Sitio web público** — Presentación profesional, servicios, blog y contacto
- **Panel clínico (médico)** — Dashboard, pacientes, citas, notas SOAP, seguimiento emocional
- **Portal del paciente** — Registro emocional, tareas, citas, seguimiento personal
- **Sistema de seguimiento emocional** — Visualización de tendencias con Recharts
- **Notas clínicas SOAP** — Sistema estructurado de registro clínico

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| Next.js 15 (App Router) | Framework principal |
| TypeScript | Tipado estático |
| TailwindCSS | Estilos |
| shadcn/ui (componentes manuales) | Componentes de UI |
| Framer Motion | Animaciones |
| Lucide Icons | Iconografía |
| Supabase | Base de datos y autenticación |
| Recharts | Gráficos y visualizaciones |
| React Hook Form + Zod | Formularios y validación |

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/mena-salud.git
cd mena-salud
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Completa las variables en `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-publica
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## Configuración de Supabase

### Paso 1: Crear proyecto

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Copia la URL del proyecto y la clave anon desde **Settings → API**

### Paso 2: Ejecutar el esquema SQL

1. Ve a **SQL Editor** en tu dashboard de Supabase
2. Copia el contenido de `supabase/schema.sql`
3. Ejecuta el script completo
4. Verifica que las tablas fueron creadas correctamente

### Paso 3: Crear usuarios demo (opcional)

1. Ve a **Authentication → Users** en Supabase
2. Crea dos usuarios:
   - `doctor@demo.cl` / contraseña: `demo1234`
   - `paciente@demo.cl` / contraseña: `demo1234`
3. Los perfiles se crean automáticamente con el trigger SQL
4. Actualiza el campo `role` en la tabla `profiles` si es necesario

### Paso 4: Configurar autenticación

En **Authentication → URL Configuration**:
- Site URL: `http://localhost:3000` (desarrollo) o tu dominio de producción
- Redirect URLs: `http://localhost:3000/api/auth/callback`

---

## Variables de entorno

| Variable | Descripción | Obligatoria |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase | Sí |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anon pública de Supabase | Sí |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave service role (solo servidor) | No |
| `NEXT_PUBLIC_APP_URL` | URL base de la aplicación | No |

---

## Subir a GitHub

```bash
# Inicializar repositorio
git init
git add .
git commit -m "feat: plataforma clínica Dr. Gabriel Mena — versión inicial"

# Conectar con GitHub
git remote add origin https://github.com/tu-usuario/mena-salud.git
git branch -M main
git push -u origin main
```

---

## Despliegue en Vercel

### Opción A: Desde Vercel Dashboard

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **Add New → Project**
3. Importa tu repositorio de GitHub
4. Agrega las variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL` → tu dominio de Vercel
5. Haz clic en **Deploy**

### Opción B: Desde CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Post-despliegue en Supabase

Actualiza la URL de tu proyecto desplegado:
- **Authentication → URL Configuration → Site URL**: `https://tu-app.vercel.app`
- **Redirect URLs**: `https://tu-app.vercel.app/api/auth/callback`

---

## Estructura de archivos

```
mena-salud/
├── app/
│   ├── (public)/          # Sitio web público
│   │   ├── page.tsx       # Página de inicio (landing)
│   │   ├── sobre-mi/      # Sobre el Dr. Mena
│   │   ├── servicios/     # Servicios clínicos
│   │   ├── contacto/      # Formulario de contacto
│   │   ├── recursos/      # Blog y recursos
│   │   └── faq/           # Preguntas frecuentes
│   ├── (auth)/            # Autenticación
│   │   ├── login/         # Inicio de sesión
│   │   └── registro/      # Registro de usuario
│   ├── (dashboard)/       # Panel médico (protegido)
│   │   ├── dashboard/     # Vista principal
│   │   ├── pacientes/     # Gestión de pacientes
│   │   ├── citas/         # Agenda de citas
│   │   ├── notas/         # Notas clínicas SOAP
│   │   ├── seguimiento/   # Seguimiento emocional
│   │   └── tareas/        # Tareas terapéuticas
│   ├── (portal)/          # Portal del paciente (protegido)
│   │   ├── mi-portal/     # Dashboard del paciente
│   │   ├── mi-estado/     # Registro emocional
│   │   ├── mis-citas/     # Citas del paciente
│   │   └── mis-tareas/    # Tareas del paciente
│   └── api/
│       └── auth/callback/ # Callback de Supabase Auth
├── components/
│   ├── ui/                # Componentes base (shadcn/ui)
│   ├── public/            # Componentes del sitio público
│   ├── dashboard/         # Componentes del panel
│   └── shared/            # Componentes compartidos
├── lib/
│   ├── supabase/          # Clientes de Supabase
│   ├── utils.ts           # Utilidades generales
│   └── mock-data.ts       # Datos demo en español
├── hooks/
│   └── use-toast.ts       # Hook de notificaciones
├── types/
│   └── index.ts           # Tipos TypeScript
├── supabase/
│   ├── schema.sql         # Esquema completo de BD
│   └── seed.sql           # Datos de ejemplo
├── middleware.ts           # Protección de rutas
└── .env.example           # Ejemplo de variables
```

---

## Funcionalidades

### Sitio público
- [x] Landing page con hero animado
- [x] Página "Sobre mí" con trayectoria
- [x] Catálogo de servicios clínicos
- [x] Formulario de contacto validado
- [x] Blog de recursos de salud mental
- [x] FAQ interactivo con acordeón
- [x] Botón flotante de WhatsApp
- [x] Navbar responsive con scroll effect
- [x] Footer completo con links y contacto

### Autenticación
- [x] Login con email/contraseña
- [x] Registro de nuevos usuarios
- [x] Sesión persistente (Supabase)
- [x] Protección de rutas (middleware)
- [x] Roles: doctor / paciente
- [x] Accesos demo de prueba

### Panel médico
- [x] Dashboard con métricas en tiempo real
- [x] Gráfico de tendencia emocional (Recharts)
- [x] Gestión completa de pacientes
- [x] Vista de detalle del paciente con 5 tabs
- [x] Agenda de citas con filtros
- [x] Sistema de notas SOAP
- [x] Seguimiento emocional por paciente
- [x] Gestión de tareas terapéuticas
- [x] Sidebar colapsable con animación

### Portal del paciente
- [x] Dashboard personal con métricas
- [x] Registro diario de estado emocional (sliders)
- [x] Vista de citas programadas e historial
- [x] Lista de tareas con toggle de completado
- [x] Gráfico de evolución emocional personal

### UX/UI
- [x] Modo oscuro por defecto
- [x] Soporte para modo claro (toggle)
- [x] Animaciones con Framer Motion
- [x] Responsive móvil completo
- [x] Datos demo en español con nombres chilenos
- [x] Formato de fechas en español
- [x] Notificaciones toast

---

## Roadmap — Próximas mejoras

- [ ] Integración real con Supabase (reemplazar datos mock)
- [ ] Sistema de mensajería médico-paciente
- [ ] Calendario visual de citas (FullCalendar)
- [ ] Formulario de pre-consulta digital
- [ ] Integración con OpenAI para resúmenes de sesión
- [ ] Notificaciones push para recordatorio de citas
- [ ] Exportación de notas clínicas en PDF
- [ ] Buscador global con ⌘K
- [ ] Teleconsulta integrada (video)
- [ ] Modo offline para registro emocional
- [ ] Panel de analytics avanzado

---

## Arquitectura preparada para IA

El proyecto incluye estructura de carpetas y tipos preparados para futuras integraciones de inteligencia artificial:

- `lib/services/ai.ts` — (por implementar) Servicio de resúmenes automáticos de sesión
- `types/index.ts` — Tipos preparados para datos de IA
- `analytics_events` table — Registro de eventos para modelos predictivos

---

## Licencia

Uso privado — Dr. Gabriel Ignacio Mena Bañados © 2025

---

*Desarrollado con Next.js 15, TypeScript y ❤️ para una medicina más humana.*
