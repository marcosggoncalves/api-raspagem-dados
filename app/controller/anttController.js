module.exports.index = (req,res)=>{
	const raspagem = require("../../utils/raspagemSiteAntt.js");
	const moment = require("moment");
	const fs = require('fs');

	moment.locale('pt-BR');

	let data = moment().format('L');

	fs.exists('antt.json', function(exists){
		if(exists){
			let arquivo =  fs.readFileSync("./antt.json", "utf8");

			arquivo = JSON.parse(arquivo);

			if(arquivo.atualizado && arquivo.atualizado < data){
				raspagem().then((result)=>{
					result = {"atualizado": data, "noticias": result};

					fs.unlink('antt.json',(error)=>{
						if(error){
							return error; 
						}else{
							let noticias = JSON.stringify(result);
							let create = fs.writeFileSync('antt.json', noticias);
							let arquivo =  fs.readFileSync("antt.json", "utf8");

						 	res.json({
						 		"success": true,
						 		"status":"Arquivo atualizado com sucesso.",
						 		"data": JSON.parse(arquivo)
						 	});
						}
					});

				}).catch((error)=>{	
					console.log(error)
					res.status(417).json({
						status: false,
						message:"Não foi possivel extrair dados!"
					});
				});
		 	}else{
		 		res.json({
			 		"success": true,
			 		"status":"Arquivo não atualizado.",
			 		"data":  arquivo
			 	});
		 	}
		}else{	
			raspagem().then((result)=>{
				result = {"atualizado": data, "noticias": result};

				let noticias = JSON.stringify(result);
				let create = fs.writeFileSync('antt.json', noticias);
				let arquivo =  fs.readFileSync("./antt.json", "utf8");

			 	res.json({
			 		"success": true,
			 		"status":"Arquivo criado com sucesso.",
			 		"data": JSON.parse(arquivo)
			 	});
			}).catch((error)=>{		
				res.status(417).json({
					status: false,
					message:"Não foi possivel extrair dados!"
				});
			});
		}
	});
}