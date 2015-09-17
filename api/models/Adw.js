/**
 * Created by Moon on 08.09.2015.
 */


    var moment = require('moment');
moment.locale('ru');

var Adw = {

    attributes: {





        datePublish: {type: 'string', defaultsTo: function(){


            return moment().format('LLL');



        }},

        FIOAdw: {type: 'string'},

        telephone: {type: 'string'},


        title: {type: 'string'},

        text: {type: 'string'},

        status: {type: 'string', defaultsTo: function(){




            return 'Забрать калым';




        } }












    }








};


module.exports = Adw;