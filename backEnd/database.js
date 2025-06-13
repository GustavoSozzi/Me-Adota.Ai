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



export async function createAbrigo(razaoSocial, cnpj, email, telefone, password, endereco) {
  const [result] = await pool.query(
    'INSERT INTO Abrigo (razaoSocial, cnpj, email, telefone, password, endereco) VALUES (?, ?, ?, ?, ?, ?)',
    [razaoSocial, cnpj, email, telefone, password, endereco]
  );
  return {
    id: result.insertId,
    razaoSocial,
    cnpj,
    email,
    telefone,
    password,
    endereco,
  };
}

// 🔹 Criar um pet (animal)
export async function createPet(nome, idade, descricao, localizacao, foto, status, abrigoId = null, tutorId = null) {
  const [result] = await pool.query(
    'INSERT INTO Pet (nome, idade, descricao, localizacao, foto, status, abrigoId, tutorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [nome, idade, descricao, localizacao, foto, status, abrigoId, tutorId]
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
    tutorId,
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

export async function loginAbrigo(email, senha){
  const [rows] = await pool.query(
    'SELECT * FROM abrigo WHERE email = ? AND password = ?',
    [email, senha]
  );
  return rows;
}

export async function getAnimais() {
  const [rows] = await pool.query("SELECT * FROM Pet");
  return rows;
}

export async function getAnimalById(id){
  const result = await pool.query("SELECT * FROM pet WHERE id = ?", [id]);
  return result[0]
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

export async function getPetsByTutorId(tutorId){
  const [rows] = await pool.query(
    'SELECT * FROM Pet Where tutorId = ?',
    [tutorId]
  )
  return rows;
}



const result = await getAdministradores();
console.log(result);

export { pool };

export async function createTokenAbrigo(abrigoId, token) {
  const [result] = await pool.query(
    `INSERT INTO tokens_abrigos (abrigo_id, token) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE token = VALUES(token), created_at = CURRENT_TIMESTAMP`,
    [abrigoId, token]
  );
  return {
    id: result.insertId,
    abrigoId,
    token,
    createdAt: new Date(),
  };
}

export async function getTokenByAbrigoId(abrigoId) {
  const [rows] = await pool.query(
    `SELECT * FROM tokens_abrigos WHERE abrigo_id = ?`,
    [abrigoId]
  );
  return rows[0];
}

export async function deleteTokenByAbrigoId(abrigoId) {
  const [result] = await pool.query(
    `DELETE FROM tokens_abrigos WHERE abrigo_id = ?`,
    [abrigoId]
  );
  return result.affectedRows > 0;
}

export async function deleteExpiredTokens() {
  const [result] = await pool.query(
    `DELETE FROM tokens_abrigos WHERE created_at < (NOW() - INTERVAL 1 HOUR)`
  );
  return result.affectedRows;
}

export async function updateAbrigo(IsTrue, id){
  const [result] = await pool.query(
    `UPDATE Abrigo SET checked = ? WHERE id = ?`,
    [IsTrue, id]
  )
  return result;
}