const mysqlConnection = require("../module/mysql.js");
const connection = mysqlConnection.connection;

exports.create = async (req, res) => {
    const _title = req.body.title;
    const _content = req.body.content;
    console.log('###create router');

    connection.query(`INSERT INTO project_data.items (title,content) VALUES(?,?)`,
    [_title,_content],
      function(err, results){
        if(err){
          console.log(err);
        }
        else{
          console.log('!!!created!!!');
        }
      }
    )
    try{
      res.send("responsed");
    }catch{}
};

exports.update = async (req, res) => {
  const _id = req.body.id;
  const _title = req.body.title;
  const _content = req.body.content;
  console.log('###update router');

  connection.query(`UPDATE project_data.items SET Title=?, Content=? WHERE Id=?`,
    [_title,_content,_id],
      function(err, results){
        if(err){
          console.log(err);
        }
        else{
          console.log('!!!'+'id: '+_id+' updated!!!');
        }
      }
    )

  try{
    res.send("responsed");
  }catch{}
};

exports.delete = async (req, res) => {
  const _id = req.body.id;
  console.log('###delete router');
  
  connection.query(`DELETE FROM items WHERE id=?`,
  [_id],
    function(err, results){
      if(err){
        console.log(err);
      }
      else{
        console.log('!!!'+'id: '+_id+' deleted!!!');
      }
    }
  )

  try{
    res.send("responsed");
  }catch{}
};

exports.read = async (req, res) =>{
  const query = `SELECT * FROM project_data.items`;
  console.log('###read router');
  connection.query(query, function(err,results){
    if (err) console.log(err);

    if(results.length != 0) res.send({result: results});
    else res.send({result: 'no item'});
  })
}