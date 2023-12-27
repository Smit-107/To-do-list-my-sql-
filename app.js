var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');


var app = express()
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}))

// database connection

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"to_do_list"
});

con.connect();

app.get('/',function(req,res) {
    res.sendFile(__dirname+'/index.html');
})


app.get('/ejs',function(req,res) {
    var select_query = "select * from task_list"
    con.query(select_query,function(error,result,field){
        if(error)throw error;
        res.render('index',{result});
    })
})

app.post('/ejs',function(req,res){
    var task = req.body.task

    var insert_query = "insert into task_list(task,taskStatus)values('" + task + "','Pending Task')"
    con.query(insert_query,function(error,result,field){
        if(error)throw error;
        res.redirect('/ejs');
    })
})

app.get('/delete/:id',function(req,res) {
    var id = req.params.id;
    var delete_query = "delete from task_list where id="+id;
    con.query(delete_query,function(error,result,field){
        if(error)throw error;
        res.redirect('/ejs');
    })
})

app.get('/edit/:id', function (req, res) {
    var id = req.params.id;

    var select_query = "SELECT * FROM task_list WHERE id = " + id;
    
    con.query(select_query, function (error, result, fields) {
        if (error) throw error;

        res.render('edit_page', { result: result[0] });
    });
});

app.post('/update/:id', function (req, res) {


    var id = req.params.id;
    var task = req.body.task;
    var taskStatus = req.body.taskStatus;

    var edit_query = "UPDATE task_list SET task = '" + task + "', taskStatus = '" + taskStatus + "' WHERE id=" + id;
    // var edit_query = "UPDATE task_list SET task = '"+ task +"' WHERE id=" + id;

    con.query(edit_query, function (error, result, fields) {
        if (error) throw error;
        res.redirect('/ejs');
    });
});


app.get('/ejs/completed',function(req,res) {
    var completed_query = "select * from task_list where taskStatus = 'Completed Task'";

    con.query(completed_query,function(error,result,field){
        if(error)throw error;
        res.render('index',{result});
    })
})

app.get('/ejs/running',function(req,res) {
    var running_query = "select * from task_list where taskStatus = 'Running Task'";

    con.query(running_query,function(error,result,field){
        if(error)throw error;
        res.render('index',{result});
    })
})

app.get('/ejs/Pending',function(req,res) {
    var Pending_query = "select * from task_list where taskStatus = 'Pending Task'";

    con.query(Pending_query,function(error,result,field){
        if(error)throw error;
        res.render('index',{result});
    })
})

app.get('/ejs/decline',function(req,res) {
    var decline_query = "select * from task_list where taskStatus = 'Decline Task'";

    con.query(decline_query,function(error,result,field){
        if(error)throw error;
        res.render('index',{result});
    })
})





app.listen(2004);