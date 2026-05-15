-- ============================================================
-- DATOS DE DEMOSTRACIÓN — PLATAFORMA DR. GABRIEL MENA
-- Ejecutar SOLO en entorno de desarrollo/demo
-- ============================================================

-- NOTA: Primero debes crear los usuarios en Supabase Auth:
-- doctor@demo.cl / demo1234 (con role: doctor)
-- paciente@demo.cl / demo1234 (con role: patient)

-- Los perfiles se crean automáticamente con el trigger handle_new_user()
-- pero puedes actualizarlos manualmente:

-- update public.profiles
-- set full_name = 'Dr. Gabriel Ignacio Mena Bañados', role = 'doctor'
-- where email = 'doctor@demo.cl';

-- update public.profiles
-- set full_name = 'Valentina Rodríguez Fuentes', role = 'patient'
-- where email = 'paciente@demo.cl';

-- ============================================================
-- Inserta estos datos DESPUÉS de crear los perfiles
-- Reemplaza '<DOCTOR_UUID>' con el UUID real del doctor
-- ============================================================

-- Ejemplo de inserción de paciente (reemplazar UUID):
/*
insert into public.patients (
  doctor_id, full_name, email, phone, birth_date, rut,
  diagnosis, medications, notes, status
) values
(
  '<DOCTOR_UUID>',
  'Valentina Rodríguez Fuentes',
  'paciente@demo.cl',
  '+56 9 8234 5678',
  '1992-03-15',
  '18.234.567-8',
  'Trastorno de ansiedad generalizada',
  'Escitalopram 10mg/día',
  'Paciente con buena adherencia al tratamiento.',
  'activo'
),
(
  '<DOCTOR_UUID>',
  'Sebastián Morales Castillo',
  'smorales@outlook.com',
  '+56 9 7123 4567',
  '1988-07-22',
  '15.678.901-2',
  'Episodio depresivo moderado',
  'Sertralina 50mg/día',
  'En proceso de duelo por separación.',
  'activo'
),
(
  '<DOCTOR_UUID>',
  'Camila Pizarro Lagos',
  'camila.pizarro@gmail.com',
  '+56 9 9345 6789',
  '1996-11-08',
  '20.123.456-7',
  'Trastorno de adaptación',
  'Sin medicación actual',
  'Primera consulta por estrés laboral.',
  'activo'
);
*/

-- Registros de estado emocional de ejemplo:
/*
insert into public.mood_entries (patient_id, date, mood, anxiety, stress, sleep_quality, energy, notes)
select
  p.id,
  current_date - (generate_series(0, 6) * interval '1 day'),
  floor(random() * 4 + 6)::integer,
  floor(random() * 4 + 3)::integer,
  floor(random() * 4 + 4)::integer,
  floor(random() * 3 + 6)::integer,
  floor(random() * 4 + 5)::integer,
  null
from public.patients p
where p.email = 'paciente@demo.cl';
*/
