import { Router } from 'express'
import ExamenesVeterinariosController from '../controllers/examenes_veterinarios_controllers.js'

export const examenesVeteriarioRouter = Router()
export const infoClienteMascotaRouter = Router()

examenesVeteriarioRouter.get('/', ExamenesVeterinariosController.getAllExams)
examenesVeteriarioRouter.get('/:id', ExamenesVeterinariosController.getExmanById)
examenesVeteriarioRouter.post('/', ExamenesVeterinariosController.createExam)
examenesVeteriarioRouter.patch('/:id', ExamenesVeterinariosController.updateExam)
examenesVeteriarioRouter.patch('/delete/:id', ExamenesVeterinariosController.deleteExam)

export const examnTypes = Router()
examnTypes.get('/', ExamenesVeterinariosController.getExamTypes)

infoClienteMascotaRouter.get('/:id', ExamenesVeterinariosController.getInfoClienteMascota)
