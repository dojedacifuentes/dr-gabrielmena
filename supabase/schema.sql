-- ============================================================
-- PLATAFORMA CLÍNICA DR. GABRIEL MENA — ESQUEMA DE BASE DE DATOS
-- Supabase / PostgreSQL
-- ============================================================

-- Habilitar extensiones
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLA: profiles
-- Perfil de usuario (médico o paciente)
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null,
  role text not null check (role in ('doctor', 'patient')) default 'patient',
  avatar_url text,
  phone text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS
alter table public.profiles enable row level security;

create policy "Los usuarios pueden ver su propio perfil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Los usuarios pueden actualizar su propio perfil"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Los doctores pueden ver todos los perfiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'doctor'
    )
  );

-- ============================================================
-- TABLA: patients
-- Ficha clínica de cada paciente
-- ============================================================
create table public.patients (
  id uuid default uuid_generate_v4() primary key,
  doctor_id uuid references public.profiles(id) on delete cascade not null,
  full_name text not null,
  email text,
  phone text,
  birth_date date,
  rut text,
  address text,
  emergency_contact text,
  emergency_phone text,
  diagnosis text,
  medications text,
  allergies text,
  notes text,
  status text not null check (status in ('activo', 'inactivo', 'alta')) default 'activo',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS
alter table public.patients enable row level security;

create policy "Los doctores pueden ver sus propios pacientes"
  on public.patients for select
  using (doctor_id = auth.uid());

create policy "Los doctores pueden insertar pacientes"
  on public.patients for insert
  with check (doctor_id = auth.uid());

create policy "Los doctores pueden actualizar sus pacientes"
  on public.patients for update
  using (doctor_id = auth.uid());

create policy "Los pacientes pueden ver su propia ficha"
  on public.patients for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and email = patients.email
    )
  );

-- ============================================================
-- TABLA: appointments
-- Registro de citas clínicas
-- ============================================================
create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  doctor_id uuid references public.profiles(id) on delete cascade not null,
  patient_id uuid references public.patients(id) on delete cascade not null,
  date date not null,
  time time not null,
  duration integer not null default 50,
  type text not null check (type in ('primera_vez', 'seguimiento', 'urgencia', 'teleconsulta')) default 'seguimiento',
  status text not null check (status in ('programada', 'confirmada', 'completada', 'cancelada', 'no_asistio')) default 'programada',
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Índices
create index appointments_date_idx on public.appointments(date);
create index appointments_doctor_id_idx on public.appointments(doctor_id);
create index appointments_patient_id_idx on public.appointments(patient_id);

-- RLS
alter table public.appointments enable row level security;

create policy "Los doctores pueden ver sus citas"
  on public.appointments for select
  using (doctor_id = auth.uid());

create policy "Los doctores pueden gestionar sus citas"
  on public.appointments for all
  using (doctor_id = auth.uid());

create policy "Los pacientes pueden ver sus citas"
  on public.appointments for select
  using (
    exists (
      select 1 from public.patients p
      join public.profiles pr on pr.email = p.email
      where p.id = appointments.patient_id and pr.id = auth.uid()
    )
  );

-- ============================================================
-- TABLA: mood_entries
-- Registros de seguimiento emocional
-- ============================================================
create table public.mood_entries (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patients(id) on delete cascade not null,
  date date not null default current_date,
  mood integer not null check (mood >= 1 and mood <= 10),
  anxiety integer not null check (anxiety >= 1 and anxiety <= 10),
  stress integer not null check (stress >= 1 and stress <= 10),
  sleep_quality integer not null check (sleep_quality >= 1 and sleep_quality <= 10),
  energy integer not null check (energy >= 1 and energy <= 10),
  notes text,
  created_at timestamptz default now() not null,
  unique(patient_id, date)
);

-- Índices
create index mood_entries_patient_date_idx on public.mood_entries(patient_id, date desc);

-- RLS
alter table public.mood_entries enable row level security;

create policy "Los doctores pueden ver registros emocionales de sus pacientes"
  on public.mood_entries for select
  using (
    exists (
      select 1 from public.patients p
      where p.id = mood_entries.patient_id and p.doctor_id = auth.uid()
    )
  );

create policy "Los pacientes pueden gestionar sus propios registros"
  on public.mood_entries for all
  using (
    exists (
      select 1 from public.patients p
      join public.profiles pr on pr.email = p.email
      where p.id = mood_entries.patient_id and pr.id = auth.uid()
    )
  );

-- ============================================================
-- TABLA: clinical_notes
-- Notas clínicas SOAP
-- ============================================================
create table public.clinical_notes (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patients(id) on delete cascade not null,
  doctor_id uuid references public.profiles(id) on delete cascade not null,
  appointment_id uuid references public.appointments(id) on delete set null,
  date date not null default current_date,
  subjective text not null,
  objective text not null,
  assessment text not null,
  plan text not null,
  tags text[] default '{}',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Índices
create index clinical_notes_patient_id_idx on public.clinical_notes(patient_id, date desc);

-- RLS
alter table public.clinical_notes enable row level security;

create policy "Solo el doctor puede ver y gestionar notas clínicas"
  on public.clinical_notes for all
  using (doctor_id = auth.uid());

-- ============================================================
-- TABLA: patient_tasks
-- Tareas terapéuticas asignadas
-- ============================================================
create table public.patient_tasks (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patients(id) on delete cascade not null,
  doctor_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  category text not null check (category in ('respiracion', 'sueno', 'reflexion', 'habitos', 'diario', 'ejercicio', 'otro')) default 'otro',
  frequency text not null check (frequency in ('diaria', 'semanal', 'una_vez')) default 'diaria',
  completed boolean default false,
  due_date date,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLS
alter table public.patient_tasks enable row level security;

create policy "Los doctores pueden gestionar tareas"
  on public.patient_tasks for all
  using (doctor_id = auth.uid());

create policy "Los pacientes pueden ver y actualizar sus tareas"
  on public.patient_tasks for select
  using (
    exists (
      select 1 from public.patients p
      join public.profiles pr on pr.email = p.email
      where p.id = patient_tasks.patient_id and pr.id = auth.uid()
    )
  );

create policy "Los pacientes pueden marcar tareas como completadas"
  on public.patient_tasks for update
  using (
    exists (
      select 1 from public.patients p
      join public.profiles pr on pr.email = p.email
      where p.id = patient_tasks.patient_id and pr.id = auth.uid()
    )
  );

-- ============================================================
-- TABLA: intake_forms
-- Formularios pre-consulta
-- ============================================================
create table public.intake_forms (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patients(id) on delete cascade not null,
  appointment_id uuid references public.appointments(id) on delete set null,
  symptoms text[] default '{}',
  anxiety_level integer check (anxiety_level >= 1 and anxiety_level <= 10),
  sleep_quality integer check (sleep_quality >= 1 and sleep_quality <= 10),
  emotional_state text,
  current_concerns text,
  medications text,
  relevant_events text,
  submitted_at timestamptz default now() not null
);

-- RLS
alter table public.intake_forms enable row level security;

create policy "Los doctores pueden ver formularios de sus pacientes"
  on public.intake_forms for select
  using (
    exists (
      select 1 from public.patients p
      where p.id = intake_forms.patient_id and p.doctor_id = auth.uid()
    )
  );

create policy "Los pacientes pueden gestionar sus formularios"
  on public.intake_forms for all
  using (
    exists (
      select 1 from public.patients p
      join public.profiles pr on pr.email = p.email
      where p.id = intake_forms.patient_id and pr.id = auth.uid()
    )
  );

-- ============================================================
-- TABLA: analytics_events
-- Eventos de analytics (preparado para futuras integraciones AI)
-- ============================================================
create table public.analytics_events (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  event_type text not null,
  event_data jsonb default '{}',
  created_at timestamptz default now() not null
);

-- RLS
alter table public.analytics_events enable row level security;

create policy "Solo doctores pueden ver analytics"
  on public.analytics_events for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'doctor'
    )
  );

-- ============================================================
-- FUNCIÓN: actualizar updated_at automáticamente
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger set_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_patients
  before update on public.patients
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_appointments
  before update on public.appointments
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_clinical_notes
  before update on public.clinical_notes
  for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_patient_tasks
  before update on public.patient_tasks
  for each row execute procedure public.handle_updated_at();

-- ============================================================
-- FUNCIÓN: crear perfil automáticamente al registrarse
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'patient')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
