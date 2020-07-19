module.exports.index = (req,res)=>{
	const request = require('request');
    const cheerio = require('cheerio');
    const moment = require("moment");
    const fs = require('fs');

    moment.locale('pt-BR');

    fs.exists('revista.json', function(exists){
        if(exists && moment().format('mm') === "20"){ // Atualizar em 1 hora
            fs.unlink('revista.json',(err)=>{
                if(err) return console.log(err);
           }); 
        }

        if(exists){
          res.json(JSON.parse(fs.readFileSync('revista.json')));
        }else{ 
            request('https://revistadoonibus.com/category/brasil/', function(error, response, html) {
              	var $ = cheerio.load(html);

                var results = [];

                $('.col-md-8 article').each(function(i) {   
                     if(i < 4){
                        let data = $(this).find('.posted-date').eq(0).text().trim();
                        let titulo = $(this).find('.entry-title').eq(0).text().trim();
                        let imagem = $(this).find('img').eq(0).attr('src');
                        let link = $(this).find('.news-thumb a').eq(0).attr('href');

                        results.push({
                            titulo: titulo,
                            link: link,
                            imagem: imagem,
                            data:data
                        });  
                    }
                });

                let data = {
                    "atualizado":moment().format('LLL'),
                    "success": true,
                    "data": {
                        "noticias": results
                    }
                };

                fs.writeFileSync('revista.json', JSON.stringify(data));

                res.json(data);
            });
        }
    });
}