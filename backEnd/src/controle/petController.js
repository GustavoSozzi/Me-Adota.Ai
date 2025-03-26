const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient();

exports.cadastrarPet = async (req, res) =>
{
    try
    {
        const pet = await prisma.pet.create({
            data: {nome, idade, descricao, fot, status, abrigoId }
        });

        res.status(201).json({message: 'Pet cadastrado com sucesso', pet});
    }catch (error)
    {
        res.status(500).json({error: 'Erro ao cadastrar Pet'});
    }
};