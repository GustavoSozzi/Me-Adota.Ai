import mysql from 'mysql2'
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getAdministradores(){
  const [rows] = await pool.query("SELECT * FROM administrador")
  return rows
} 

export async function getAdministradores(id){
  const [rows] = await pool.query(`
    SELECT * 
    FROM administrador 
    where usuario_id = ?
    `, [id])
    return rows[0]     
}

export async function createAdministrador(nome, usuario_id) {
  const [result]  = await pool.query(
    `INSERT INTO administrador(nome, usuario_id) VALUES (?, ?)`,
    [nome, usuario_id]
  );
  return {
    id: result.insertId,
    nome,
    usuario_id
  };
}

// Função para inserir um usuário (tutor, abrigo ou admin)
export async function createUsuario(nome, email, senha, tipo, telefone, cnpj = null, endereco = null) {
  const result = await pool.query(
    `INSERT INTO usuarios (nome, email, senha, tipo, telefone, cnpj, endereco) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nome, email, senha, tipo, telefone, cnpj, endereco]
  );
  return result;
}

// Função para inserir um animal em um abrigo
export async function createAnimal(nome, idade, descricao, foto, status, abrigo_id) {
  const result = await pool.query(
    `INSERT INTO animais (nome, idade, descricao, foto, status, abrigo_id) VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, idade, descricao, foto, status, abrigo_id]
  );
  return result;
}

// Função para registrar uma doação
export async function createDoacao(tutor_id, abrigo_id, animal_id, valor) {
  const result = await pool.query(
    `INSERT INTO doacoes (tutor_id, abrigo_id, animal_id, valor) VALUES (?, ?, ?, ?)`,
    [tutor_id, abrigo_id, animal_id, valor]
  );
  return result;
}

const result = await getAdministradores()
console.log(result)