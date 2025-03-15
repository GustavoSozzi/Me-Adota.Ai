import type { FastifyRequest, FastifyReply } from "fastify";
import { CreateCustomerService } from "../service/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, cpf, dataNascimento, telefone } = request.body as {
        name: string;
        email: string;
        cpf: string;
        dataNascimento: string; // Pode vir como string no JSON
        telefone: string;
      };

      const customerService = new CreateCustomerService();
      const customer = await customerService.execute({
        name,
        email,
        cpf,
        dataNascimento: new Date(dataNascimento), // Converte para Date
        telefone,
      });

      reply.send(customer);
    } catch (error) {  // <-- Removemos o try extra
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(400).send({ error: "Ocorreu um erro desconhecido" });
      }
    }
  }
}

export { CreateCustomerController };
