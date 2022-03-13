module.exports.index = (req,res)=>{
	const request = require('request');
    const cheerio = require('cheerio');
    const moment = require("moment");
    const fs = require('fs');

    moment.locale('pt-BR');

    fs.exists('antt.json',(exists)=>{
        if(exists){
            let data = JSON.parse(fs.readFileSync('antt.json'));
            let ultimaAtualizacao = moment(data.atualizado,"DD/MM/YYYY HH:mm").format('HH'); // Utima atualização

            if(moment().format('HH') > ultimaAtualizacao){
                fs.unlink('antt.json',(err)=>{
                    if(err) return console.log(err);
                }); 
                
                return res.redirect('/antt');
            }

            res.json(data);
        }else{
            request('https://www.gov.br/antt/pt-br/assuntos/ultimas-noticias', function(error, response, html) {
              	var $ = cheerio.load(html);

                var results = [];

                $('.ultimas-noticias li').each(function(i){

                    if(i <= 8){
                        let descricao = $(this).find('h2').text().trim();
                        let imagem = $(this).find('img').eq(0).attr('src');
                        let link = $(this).find('a').eq(0).attr('href');

                        results.push({imagem, link, descricao});  
                    }          
                });

                let data = {
                    "atualizado":moment().format("DD/MM/YYYY HH:mm"),
                    "success": true,
                    "data": {
                        "noticias": results
                    }
                };

                fs.writeFileSync('antt.json', JSON.stringify(data));

                res.json(data);
            });
        }
    });
}