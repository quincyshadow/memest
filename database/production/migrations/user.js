let query = `
  CREATE TABLE if not exists users (
      id integer NOT NULL,
      password text
  );

 /* id,category,title,tags,thumbUrl,fullSzUrl
    int,string*****
 */

  CREATE SEQUENCE users_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

  ALTER SEQUENCE users_id_seq OWNED BY users.id;

  ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);

  ALTER TABLE ONLY users
  ADD CONSTRAINT users_pkey PRIMARY KEY (id);
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
DROP TABLE users CASCADE;
`
drop = drop.replace(/\n/g, '').replace(/\t/g, ' ');

exports.down = function(knex, Promise)
{
  return queryBuilder(drop, knex, 'drop');
};
