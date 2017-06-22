/**
 * Created by cl on 2017/5/31.
 */
let express = require('express');
let app = express();


app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

app.post('/api/image', function(req, res, err) {
    if(err){
        console.log(err)
    }
    let obj = {
        url:'http://localhost:8080/admin/article/health',
        status:200,
        success:'ok'
    };
    console.log(req);
    res.json(obj)
});

app.listen(9000, function () {
    console.log('Example app listening on port 3000!');
});


