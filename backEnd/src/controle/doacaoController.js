const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient();

exports.realizarDoacao = async (req, res) =>
{
    const {valor, data, metodoPagamento, codigoPix, comprovante, tutorId, abrigoId, animalBeneficiado } = req.body;

    try
    {
        const doacao = await prisma.doacao.create({
            data: {valor, data, metodoPagamento, codigoPix, comprovante, abrigoId}
        });

        await prisma.historicoDoacoes.create({
            data: { data: new Date(), valor, animalBeneficiado, tutorId}
        });

        res.status(201).json({message: 'Doação realizada com sucesso', doacao});
    }catch (error)
    {
        res.status(500).json({error: 'Erro ao processar a doação'});
    }
};