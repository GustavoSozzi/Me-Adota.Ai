const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient();

exports.cadastroTutor = async (req, res) => 
{
    const {noeCompleto, cpf, dataNascimento, email, telefone} = req.body;
    try 
    {
        const tutor = await prisma.tutor.create(
        {
            data:
            {
                noeCompleto, cpf,dataNascimento,email,telefone
            }
        });
        res.status(201).json(tutor);
    }catch(error)
    {
        res.status(400).json({error: 'Erro ao cadastrar tutor'});
    }
};