const express = require('express');
const auth = require('../controlers/auth');
const formidable = require('formidable');
const {getAll,getAllData,getById} = require('../controlers/admin');
const form = formidable({ multiples: true });
const router = express.Router();


router.use(express.json())

   router.get('/login', (req,res)=>{
         res.render('adminlogin'); 
   });

   router.post('/login', (req,res)=>{

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        else{
            console.log(fields);
            auth.postAdminLogin(fields,res,null);
        }
    });
    //    res.render('addmin')

   });

   router.get('/home',(req, res)=>{
       if(req.user){
           res.render('adminpage')
       }else
           res.render('adminlogin');
   })

   router.get('/patients/all',(req, res) =>{
        console.log('Getting all ');
        console.log(req.user)
        if (req.user){
            getAll(res);
        }else
        res.render('adminlogin');     
 
   })
   router.get('/data/all',(req, res) =>{
    console.log('Getting all ');
    console.log(req.user)
    if (req.user){
        getAllData(res);
    }else
    res.render('adminlogin');     

})

   router.get('/patient/:id',( req, res )=>{
       
       let id = req.params.id;
    //    let sample = 'YQXWzHavQAMl6U1YjOURvlv9u3O0N9xR7KQ5F9ekPj0=';
       if (req.user){
            getById(id,res)
       }else
            res.render('adminlogin');      
   });

   router.post('/add',( req, res )=>{
        if (req.user){
            res.send('Adding single patient')
        }else
            res.render('adminlogin');
        
   });

    router.patch('/update/:id',( req, res )=>{
        if (req.user){
            res.render('Updating a user')
        }else
            res.redirect('/admin/login');
       
    });


   module.exports = router

//    {
    //    "_id":{"$oid":"5f1bf356d2cdbb1d4bd8c458"},
    //    "disease":[],
    //    "date":"Sat Jul 25 2020 04:53:24 GMT-0400 (Eastern Daylight Time)",
    //    "name":"thie",
    //    "email":"sehho@gmail.com",
    //    "age":{"$numberInt":"87"},
    //    "password":"GfDc8nIGrBW9GpwHjsxxqPTsPaNncXOXy9naGqleRj0=",
    //    "image_url":"profilePic/unnamed.jpg",
    //    "qrcode_url":"qrcode/sehho@gmail.com.png",
    //    "logs":[{"date":"Sat Jul 25 2020 04:53:24 GMT-0400 (Eastern Daylight Time)","test":[null],"medicine":[null],"_id":{"$oid":"5f1bf356d2cdbb1d4bd8c459"}}],"__v":{"$numberInt":"0"}}