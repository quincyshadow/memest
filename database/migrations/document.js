let query = `
SET search_path TO public;

  CREATE TABLE if not exists document (
      id integer NOT NULL,
      user_id text,
      img_url text,
      category text,
      tags text,
      approved text,
      vote integer
  );

 /* id,user_id,img_url,category,tags,approved
    int,string*****
 */

  CREATE SEQUENCE document_id_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

  ALTER SEQUENCE document_id_seq OWNED BY document.id;

  ALTER TABLE ONLY document ALTER COLUMN id SET DEFAULT nextval('document_id_seq'::regclass);

  ALTER TABLE ONLY document
  ADD CONSTRAINT document_pkey PRIMARY KEY (id);
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
DROP TABLE vote CASCADE;
`
drop = drop.replace(/\n/g, '').replace(/\t/g, ' ');

exports.down = function(knex, Promise)
{
  return queryBuilder(drop, knex, 'drop');
};
