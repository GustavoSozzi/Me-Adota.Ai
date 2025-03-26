const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient();

exports.getHistoricoDoacao = async (req, res) =>
{
    const {tutorId} = req.params;
    try
    {
        const historico = await prisma.historicoDoacoes.findMany({
            where: {tutorId: parseInt(tutorId)}
        });
        res.json(historico);
    }catch(error)
    {
        res.status(500).json([{error: 'Erro ao buscarhistórico de doações'}]);
    }
};