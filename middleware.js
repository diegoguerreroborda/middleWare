const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001

app.use(cors())
/*
var currentTime = "";
var currentPort = "";
var currentOkServer = "";
*/
var datas = "";

var fs = require('fs'),
       bite_size = 256,
       readbytes = 0,
       file;

fs.open('log.txt', 'r', function(err, fd) { 
    file = fd; 
    readsome();
});

function readsome() {
       var stats = fs.fstatSync(file);
       if(stats.size<readbytes+1) {
           setTimeout(readsome, 2000);
       }else {
           fs.read(file, new Buffer(bite_size), 0, bite_size, readbytes, processsome);
       }
}

function processsome(err, bytecount, buff) {
    console.log('Read', bytecount, 'and will process it now.');

    //if(bytecount == 35){
        if(buff.toString('utf-8', 0, bytecount).charAt(0) == 'T'){
            console.log(buff.toString('utf-8', 0, bytecount));
            datas = buff.toString('utf-8', 0, bytecount);
            //datas = datas.substring(0, datas.length-2);
            datas = datas.split("\n");
        }
    //}
    //console.log(buff[0].toString());
    readbytes+=bytecount;
    process.nextTick(readsome);
}

app.get('/info_servers', (req, res) => {
    res.send(datas)
  })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})