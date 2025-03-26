 import express from 'express'
 
 const app = express()

 app.use(express.json())

 import { getAdministradores, createAdministrador } from './database.js'

 app.get("/administrador", async (req, res) => {
  const administradores = await getAdministradores()
  res.send(administradores)
 })

 app.get("/administrador/:id", async(req, res) => {
  const id = req.params.id
  const administrador = await getAdministradores(id)
  res.send(administrador)
 })

 app.post("/administrador", async(req, res) => {
  const {title, contents} = req.body
  const administrador = await createAdministrador(title, contents)
  res.status(201).send(administrador)
 })

 app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
 })

 app.listen(8080, () => {
  console.log('Server is running on port 8080');
 });