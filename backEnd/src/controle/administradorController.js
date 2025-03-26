const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient();

exports.aprovarAbrigo = async (req, res) =>
{
    const {abrigoId} = req.params;

    try 
    {
        const abrigo = await prisma.abrigo.update({
            where: {id: parseInt(abrigoId)},
            data : {valido: true}
        });

        res.json({message: 'Abrigo aprovado com sucesso', abrigo});
    }catch(error)
    {
        res.status(500).json({error: 'Erro ao aprovar abrigo'});
    }
};