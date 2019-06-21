let query = `
SET search_path TO public;

  CREATE TABLE if not exists guestusers (
      id integer NOT NULL,
      ipaddr text,
      has_voted text
  );

 /* id,ipaddr,has_voted
    int,string*****
 */

  CREATE SEQUENCE guestusers_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

  ALTER SEQUENCE guestusers_id_seq OWNED BY guestusers.id;

  ALTER TABLE ONLY guestusers ALTER COLUMN id SET DEFAULT nextval('guestusers_id_seq'::regclass);

  ALTER TABLE ONLY guestusers
  ADD CONSTRAINT guestusers_pkey PRIMARY KEY (id);
`

// ALTER TABLE ONLY public.doctor ALTER COLUMN id SET DEFAULT nextval('public.doctor_id_seq'::regclass);
//
// ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);

// ALTER TABLE ONLY public.appointment
//     ADD CONSTRAINT appointment_pkey PRIMARY KEY (id);
//
// ALTER TABLE ONLY public.note
//     ADD CONSTRAINT note_pkey PRIMARY KEY (id);
//
// ALTER TABLE public.note
//     ADD CONSTRAINT fkey
//     FOREIGN KEY (appointment_id)
//     REFERENCES public.appointment (id)
//     ON DELETE CASCADE;

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
    .catch(function(error)
    {
      console.error(error);
    })
}

exports.up = function(knex, Promise)
{
  return queryBuilder(query, knex, 'all');
};

////////////////////////////////

let drop = `
DROP TABLE guestusers CASCADE;
`
drop = drop.replace(/\n/g, '').replace(/\t/g, ' ');

exports.down = function(knex, Promise)
{
  return queryBuilder(drop, knex, 'drop');
};
