const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    // função que retorna os spots com o filtro de pesquisa(MOBILE)
    async index(req, res){
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    // função para cadastrar as empresas e as tecnologias
    async store(req, res){
        const { filename } = req.file;
        const { company, techs, price} = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({ error: 'User does not exist' });
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price
        })

        return res.json(spot)
    }
};