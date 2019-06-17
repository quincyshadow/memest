let table_name = 'doctor'
//excluded column, 'id'.
let column_name = `name,email,bio,img_url,password`
let query = `
delete from ${table_name};
INSERT INTO ${table_name} (${column_name})
values
('Dr. James Smith','jamessmith@galvanize.com','insert bio here','/static/sample.jpg','asdf'),
('Dr. Jess Jones','jessjones@galvanize.com','insert bio here','/static/sample.jpg','asdf'),
('Dr. Meryl Krich','merylkrich@galvanize.com','insert bio here','/static/sample.jpg','asdf')
`

query = query.replace(/\n/g, '').replace(/\t/g, ' ');
function queryBuilder (qu, knex, name) {
  return knex.schema
    .then(() => {
      // We need to ensure the function exists, then add the table trigger
      return knex.schema.raw(qu)
    })
}
///////
exports.seed = function(knex, Promise)
  {
    return queryBuilder(query, knex, 'all');
  };
