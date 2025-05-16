import mysql from "mysql2";
import "dotenv/config";

// Criando a conexão com o banco de dados
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// 🔹 Buscar todos os administradores
export async function getAdministradores() {
  const [rows] = await pool.query("SELECT * FROM Administrador");
  return rows;
}

// 🔹 Buscar administrador por ID
export async function getAdministrador(id) {
  const [rows] = await pool.query(
    'SELECT * FROM Administrador WHERE id = ?',
    [id]
  );
  return rows[0];
}

// 🔹 Criar um administrador
export async function createAdministrador(nome) {
  const [result] = await pool.query(
    'INSERT INTO Administrador (nome) VALUES (?)',
    [nome]
  );
  return {
    id: result.insertId,
    nome,
  };
}

// 🔹 Criar um tutor
export async function createTutor(nomeCompleto, telefone, cpf, email, senha, dataNascimento) {
  const [result] = await pool.query(
    'INSERT INTO Tutor (nomeCompleto, telefone, cpf, email, senha, dataNascimento) VALUES (?, ?, ?, ?, ?, ?)', 
    [nomeCompleto, telefone, cpf, email, senha, dataNascimento]
  );
  return {
    id: result.insertId,
    nomeCompleto,
    telefone,
    cpf,
    email,
    senha,
    dataNascimento,
  };
}



export async function createAbrigo(nomeSocial, cnpj, email, telefone, endereco) {
  const [result] = await pool.query(
    'INSERT INTO Abrigos (nomeSocial, cnpj, email, telefone, endereco) VALUES (?, ?, ?, ?, ?)',
    [nomeSocial, cnpj, email, telefone, endereco]
  );
  return {
    id: result.insertId,
    nomeSocial,
    cnpj,
    email,
    telefone,
    endereco,
  };
}

// 🔹 Criar um pet (animal)
export async function createPet(nome, idade, descricao, localizacao, foto, status, abrigoId = null) {
  const [result] = await pool.query(
    'INSERT INTO Pet (nome, idade, descricao, localizacao, foto, status, abrigoId) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nome, idade, descricao, localizacao, foto, status, abrigoId]
  );
  return {
    id: result.insertId,
    nome,
    idade,
    descricao,
    localizacao,
    foto,  // Nome da foto
    status,
    abrigoId,
  };
}


// 🔹 Criar uma doação
export async function createDoacao(valor, data, metodoPagamento, codigoPix, comprovante, abrigoId) {
  const [result] = await pool.query(
    'INSERT INTO Doacao (valor, data, metodoPagamento, codigoPix, comprovante, abrigoId) VALUES (?, ?, ?, ?, ?, ?)',
    [valor, data, metodoPagamento, codigoPix, comprovante, abrigoId]
  );
  return {
    id: result.insertId,
    valor,
    data,
    metodoPagamento,
    codigoPix,
    comprovante,
    abrigoId,
  };
}

// 🔹 Criar um histórico de doação
export async function createHistoricoDoacao(data, valor, animalBeneficiado, tutorId) {
  const [result] = await pool.query(
    'INSERT INTO HistoricoDoacoes (data, valor, animalBeneficiado, tutorId) VALUES (?, ?, ?, ?)',
    [data, valor, animalBeneficiado, tutorId]
  );
  return {
    id: result.insertId,
    data,
    valor,
    animalBeneficiado,
    tutorId,
  };
}

export async function loginTutor(email, senha) {
  const [rows] = await pool.query(
    'SELECT * FROM Tutor WHERE email = ? AND senha = ?',
    [email, senha]
  );
  return rows;
}

// 🔹 Buscar todos os tutores
export async function getTutores() {
  const [rows] = await pool.query("SELECT * FROM Tutor");
  return rows;
}

// 🔹 Buscar tutor por ID
export async function getTutor(id) {
  const [rows] = await pool.query(
    "SELECT * FROM Tutor WHERE id = ?",
    [id]
  );
  return rows[0];
}

export async function getAnimals(id){
  const [rows] = await pool.query(
    "SELECT * FROM animais where id = ?",
    [id]
  );
  return rows[0];
}


// 🔹 Teste: buscar administradores e exibir no console
const result = await getAdministradores();
console.log(result);

export { pool };
