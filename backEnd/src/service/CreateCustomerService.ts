import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Criando a instância do Prisma

interface CreateCustomerProps {
  name: string;
  email: string;
  cpf: string;
  dataNascimento: Date;
  telefone: string;
}

class CreateCustomerService {
  async execute({ name, email, cpf, dataNascimento, telefone }: CreateCustomerProps) {
    if (!name || !email || !cpf || !dataNascimento || !telefone) {
      throw new Error("Preencha todos os campos");
    }

    // Verifica se o CPF ou e-mail já existem para evitar duplicações
    const existingCustomer = await prisma.tutor.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });

    if (existingCustomer) {
      throw new Error("Cliente já cadastrado com esse CPF ou e-mail");
    }

    // Criação do cliente no banco de dados
    const customer = await prisma.tutor.create({
      data: {
        nomeCompleto: name,
        email,
        cpf,
        dataNascimento,
        telefone,
      },
    });

    return { ok: true, customer };
  }
}

export { CreateCustomerService };
