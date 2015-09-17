/**
 * Created by Moon on 08.09.2015.
 */

var validator = require('validator');

var lodash = require('../../node_modules/sails/node_modules/lodash');

var spawn = require('child_process').spawn;


var SiteController = {




    view: function(req, res, next){





        Adw.find({}).exec(function(err, adw){



            res.view('homepage', {adw: adw});



        });





    },




    addEmail: function(req, res, next){






        if(validator.matches(req.param('phone'), /([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})/)){



            Phones.create({phone: req.param('phone').replace(/\D+/g, "")}).exec(function(err, email){




              var sendWhatsUp =  spawn('python', ['/home/root2/yowsup-master/yowsup-cli', 'demos', '--login', '77027082223:Qmq4H3yHsGQhNI4VP63RWEMTVM8=', '--send','77083539578', 'Вы успешно подписались на сервис КАЛЫМ.KZ' ]);



              sendWhatsUp.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
              });

              sendWhatsUp.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
              });

              sendWhatsUp.on('close', function (code) {
                console.log('child process exited with code ' + code);
              });



                res.send('ok');




            })




        }else{


            res.send('no');


        }














    },




    addhelp: function(req, res, next){

        if(validator.matches(req.param('phone'), /([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})/)) {


            Helpmessage.create({phone: req.param('phone'), message: req.param('message')}).exec(function (err, help) {

                //Отправка вотсап от посетителя



                var sendWhatsUp =  spawn('python', ['/home/root2/yowsup-master/yowsup-cli', 'demos', '--login', '77027082223:Qmq4H3yHsGQhNI4VP63RWEMTVM8=', '--send','77083539578', req.param('message')+ 'От: '+req.param('phone') ]);



                sendWhatsUp.stdout.on('data', function (data) {
                    console.log('stdout: ' + data);
                });

                sendWhatsUp.stderr.on('data', function (data) {
                    console.log('stderr: ' + data);
                });

                sendWhatsUp.on('close', function (code) {
                    console.log('child process exited with code ' + code);
                });



                res.send('ok');


            });

        }else {


            res.send('no');


        }





    },



    kalymtrue: function(req, res, next){


        Adw.update({id: req.param('id')}, {status: 'Калым занят'}).exec(function(err, adw){





            res.send(adw);






        })







    }















};









module.exports = SiteController;