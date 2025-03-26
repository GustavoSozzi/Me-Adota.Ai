const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient();

exports.cadastrarAbrigo = async (req, res) =>    
{
    const{nomeSocial, cnpj, email, telefone, endereco, administradorID} = req.body;
    try 
    {
        const abrigo  = await prisma.abrigo.create({
            data: {nomeSocial, cnpj, email, telefone, endereco, administradorID}
        });
        res.status(201).json({message: 'Abrigocadastrado, aguardando aprovação', abrigo});
    }catch(erro)
        {
            res.status(500).json({error: 'Erro ao cadastrar abrigo'});
    
        } 
};