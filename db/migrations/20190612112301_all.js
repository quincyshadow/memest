let query = `
  CREATE TABLE public.doctor (
      id integer NOT NULL,
      name text,
      email text,
      bio text,
      img_url text,
      password text
  );

  CREATE SEQUENCE public.doctor_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

  ALTER SEQUENCE public.doctor_id_seq OWNED BY public.doctor.id;

  CREATE TABLE public.appointment (
      id integer NOT NULL,
      doctor_id integer,
      name text,
      date text,
      reason text,
      details text,
      status text
  );

  CREATE SEQUENCE public.appointment_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

  ALTER SEQUENCE public.appointment_id_seq OWNED BY public.appointment.id;

  CREATE TABLE public.note (
      id integer NOT NULL,
      appointment_id integer,
      comment text
  );

  CREATE SEQUENCE public.note_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;


  ALTER SEQUENCE public.note_id_seq OWNED BY public.note.id;

  ALTER TABLE ONLY public.doctor ALTER COLUMN id SET DEFAULT nextval('public.doctor_id_seq'::regclass);

  ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);

  ALTER TABLE ONLY public.note ALTER COLUMN id SET DEFAULT nextval('public.note_id_seq'::regclass);

  ALTER TABLE ONLY public.doctor
      ADD CONSTRAINT doctor_pkey PRIMARY KEY (id);

  ALTER TABLE ONLY public.appointment
      ADD CONSTRAINT appointment_pkey PRIMARY KEY (id);

  ALTER TABLE ONLY public.note
      ADD CONSTRAINT note_pkey PRIMARY KEY (id);

  ALTER TABLE public.note
      ADD CONSTRAINT fkey
      FOREIGN KEY (appointment_id)
      REFERENCES public.appointment (id)
      ON DELETE CASCADE;
`

query = query.replace(/\n/g, '').replace(/\t/g, ' ');
//TODO: ADD replace any commented line starting with - with blank line

function queryBuilder(qu, knex, name)
{
  return knex.schema
    .then(() =>
    {
      // We need to ensure the function exists, then add the table trigger
      return knex.schema.raw(qu)
    })
}

exports.up = function(knex, Promise)
{
  return queryBuilder(query, knex, 'all');
};

////////////////////////////////

let drop = `
DROP TABLE public.doctor CASCADE;

DROP TABLE public.appointment CASCADE;

DROP TABLE public.note CASCADE;
`
drop = drop.replace(/\n/g, '').replace(/\t/g, ' ');

exports.down = function(knex, Promise)
{
  return queryBuilder(drop, knex, 'drop');
};
