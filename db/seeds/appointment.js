let table_name = 'appointment'
//excluded column, 'id'.
let column_name = `doctor_id,name,date,reason,details,status`
// Reference -?
//('Dr. James Smith','jamessmith@galvanize.com','insert bio here','asdf'),
// ('Dr. Jess Jones','jessjones@galvanize.com','insert bio here','asdf'),
// ('Dr. Meryl Krich',
let query = `
delete from ${table_name};
INSERT INTO ${table_name} (${column_name})
values
(1,'Austin Gilbert','05/20/18','Feeling Sick','I''ve been coughing every few minutes for the last few days.','confirmed'),
(1,'Nick D''Errico','05/15/18','Injury','I was losing to troy in ping pong and I got injured while trying to keep up with his level.','confirmed'),
(1,'Gabe Tracer','05/22/18','Basketball Injury','I think I injured my ankle yesterday.','unconfirmed'),
(1,'Sombra','04/01/18','Wrist Pain','Injury playing overwatch.','completed')
`

query = query.replace(/\n/g, '').replace(/\t/g, ' ');

function queryBuilder(qu, knex, name) {
  return knex.schema
    .then(() => {
      // We need to ensure the function exists, then add the table trigger
      return knex.schema.raw(qu)
    })
}
///////
exports.seed = function(knex, Promise) {
  return queryBuilder(query, knex, 'all');
};
