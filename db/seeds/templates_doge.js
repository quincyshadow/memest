// var cloudinary = require('cloudinary').v2;

let table_name = 'templates'
//excluded column, 'id'.
let column_name = `category,title,tags,thumbUrl,fullSzUrl`
let images_obj = {
  'FB_IMG_1559666266402_1_pgurkv':['Baby Doge','tags','category'],
  'FB_IMG_1560783832708_gva3oa'  :['Cringe Kek Doge','tags','category'],
  'FB_IMG_1560531374047_icdplu'  :['Long Forward Doge','tags','category'],
  'FB_IMG_1555725760083_of7czh'  :['Cerberus Doge','tags','category'],
  'FB_IMG_1559859280163_lid3tg'  :['Angry Baby Doge','tags','category'],
  'FB_IMG_1560367024430_nvmvw8'  :['Angry Baby Doge','tags','category'],
  'FB_IMG_1559666266402_cw8eql'  :['Baby Doge','tags','category'],
  'FB_IMG_1555983600889_xe4v2m'  :['Forward Doge','tags','category'],
  'FB_IMG_1554592710974_wbabe3'  :['Oh Doge','tags','category'],
  'FB_IMG_1554923615791_cuibmz'  :['Stop Doge','tags','category'],
  'FB_IMG_1555711166822_cltbus'  :['Eye Doge','tags','category'],
  'FB_IMG_1555108617320_guvdkl'  :['Party Doge','tags','category'],
  'FB_IMG_1554776261957_txjqf6'  :['Heart','tags','category'],
  'FB_IMG_1554682115640_xqx4r0'  :['Crying Doge','tags','category'],
  'FB_IMG_1553867688101_lwks3o'  :['Dab','tags','category'],
  'FB_IMG_1553277525831_pg4vpo'  :['Cringe','tags','category'],
  'FB_IMG_1553268377991_onctno'  :['Boomer Doge','tags','category'],
  'FB_IMG_1553268336814_o605ll'  :['Heart','tags','category'],
  'FB_IMG_1553268256190_rtjldn'  :['Little Doge','tags','category'],
  'FB_IMG_1553714398777_vu3pgm'  :['What','tags','category'],
  'FB_IMG_1553269863054_ipyeir'  :['Little Doge','tags','category'],
  'FB_IMG_1552950712945_pgydt2'  :['Beer Doge','tags','category'],
}

let imageArr = [];
let thumbnailArr = [];
let queryLine = [];

let thumbset = '';
Object.keys(images_obj).forEach(e=>{
  let base_url = `https://res.cloudinary.com/xdoge/image/upload/${thumbset}`;
  let url_2 = 'v1560896231/dogetemplate/';
  let regularSizeImage = `${base_url}${url_2}${e}`;
  imageArr.push(regularSizeImage);

  thumbset = 'c_thumb,h_150,w_150/';
  let thumbnailImage = `${base_url}${url_2}${e}`
  thumbnailArr.push(thumbnailImage);

  let templatestring = `'doge','${images_obj[e][0]}','${images_obj[e][1]}','${thumbnailImage}','${regularSizeImage}'`

  let stripslashes = templatestring.replace(/\\/g, '')

  queryLine.push(stripslashes)
  })

 console.log(queryLine[0]);

let query = `
delete from ${table_name};
INSERT INTO ${table_name} (${column_name})
values
(1,'Doge','','','','')
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
