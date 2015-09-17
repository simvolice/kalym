/**
 * Created by Moon on 08.09.2015.
 */

var validator = require('validator');
var spawn = require('child_process').spawn;

var AdminController = {


    view: function(req, res, next){


        res.locals.layout = 'auth/auth.handlebars';


        res.view('auth/admin');




    },



    addAdw: function(req, res, next){











            Adw.create({FIOAdw: req.body.fio, telephone: req.body.phone, title: req.body.title, text: req.body.text }).exec(function(err, adw){
                Adw.find({}).exec(function(err, adwAll){



                    Phones.find({}).exec(function(err, phones){



                        phones.forEach(function(item){







                        var sendWhatsUp =  spawn('python', ['/home/root2/yowsup-master/yowsup-cli', 'demos', '--login', '77027082223:Qmq4H3yHsGQhNI4VP63RWEMTVM8=', '--send',item.phone, 'В сервисе КАЛЫМ.KZ, появился новый калым, забери его первый.' ]);



                        sendWhatsUp.stdout.on('data', function (data) {
                            console.log('stdout: ' + data);
                        });

                        sendWhatsUp.stderr.on('data', function (data) {
                            console.log('stderr: ' + data);
                        });

                        sendWhatsUp.on('close', function (code) {
                            console.log('child process exited with code ' + code);
                        });



                    });

                    });





                    sails.sockets.blast('publicADW', {adwOne: adw, all:adwAll});


            res.redirect('/admin');





        });

    });






    }












};


module.exports = AdminController;