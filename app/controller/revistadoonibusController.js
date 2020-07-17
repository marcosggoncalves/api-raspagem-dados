module.exports.index = (req,res)=>{
	const request = require('request');
    const cheerio = require('cheerio');
    const moment = require("moment");

    moment.locale('pt-BR');

    request('https://revistadoonibus.com/', function(error, response, html) {
      	var $ = cheerio.load(html);

        var results = [];

        $('.featured-small-items .news-item').each(function(i) {   
             if(i < 5){
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

        res.json({
            "atualizado":moment().format('L'),
			"success": true,
			"data": {
				"noticias": results
			}
		});
    });
}