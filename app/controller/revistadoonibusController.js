module.exports.index = (req,res)=>{
	const request = require('request');
    const cheerio = require('cheerio');
    const moment = require("moment");
    const fs = require('fs');

    moment.locale('pt-BR');

    fs.exists('revista.json', (exists)=>{
        if(exists){
            let data = JSON.parse(fs.readFileSync('revista.json'));
            let ultimaAtualizacao = moment(data.atualizado,"DD/MM/YYYY HH:mm").format('HH'); // Utima atualização

            if(moment().format('HH') > ultimaAtualizacao){
                fs.unlink('revista.json',(err)=>{
                    if(err) return console.log(err);
                }); 

                return res.redirect('/revista'); 
            }

            res.json(data);
        }else{ 
            request('https://revistadoonibus.com', function(error, response, html){
              	var $ = cheerio.load(html);

                var results = [];

                $('.featured-small-items .news-item').each(function(i){   
                     if(i < 6){
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
                    "atualizado":moment().format('DD/MM/YYYY HH:mm'),
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