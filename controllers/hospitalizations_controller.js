import { HospitalizationsModel } from '../models/hospitalizations_model.js'
import { NoDataFound, NotFoundUser, InfoAlreadyExisting, AccountAlreadyDisable } from '../squemas/errors_squemas.js'
import { validatehospitalizationCreate, validateHospitalizationUpdate, validateHospitalizationDelete } from '../squemas/hospitalizations.js'

export class HospitalizationsController {
  static async getAll (req, res) {
    const response = await HospitalizationsModel.getAll()
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran hospitalizaciones registadas' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error en el servidor' })
    } else {
      res.json(response)
    }
  }

  static async getId (req, res) {
    const { id } = req.params
    const response = await HospitalizationsModel.getId({ id })
    if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentran datos registrados para la historia clinica seleccionada' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.json(response)
    }
  }

  static async getHospitalizationsByPetId (req, res) {
    const { id } = req.params
    const response = await HospitalizationsModel.getHospitalizationsByPetId({ id })
    if (response instanceof NoDataFound) return res.status(404).json({ message: 'No se encuentran historias clinicas para la mascota seleccionada' })
    if (response instanceof Error) return res.status(500).json({ message: 'Error interno en el servidor' })
    res.json(response)
  }

  static async create (req, res) {
    const result = validatehospitalizationCreate(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }

    const response = await HospitalizationsModel.create({ input: result.data })
    if (response instanceof InfoAlreadyExisting) {
      res.status(400).json({ message: 'La mascota ya tiene una hospitalizacion activa en el sistema' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.status(201).json({ message: 'Hospitalizacion creada satisfactoriamentre' })
    }
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validateHospitalizationUpdate(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await HospitalizationsModel.update({ id, input: result.data })
    if (response instanceof AccountAlreadyDisable) {
      res.status(400).json({ message: 'la hospitalizacion ya fue eliminada con anterioridad' })
    } else if (response instanceof NoDataFound) {
      res.status(404).json({ message: 'No se encuentra el registro a editar' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.status(201).json({ message: 'Hospitalizacion actualizada correctamente' })
    }
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = validateHospitalizationDelete(req.body)
    if (!result.success) {
      return res.status(400).json({ message: JSON.parse(result.error.message)[0].message })
    }
    const response = await HospitalizationsModel.delete({ id, input: result.data })
    if (response instanceof NotFoundUser) {
      res.status(404).json({ message: 'No se encuentra la historia clinica a eliminar' })
    } else if (response instanceof AccountAlreadyDisable) {
      res.status(400).json({ message: 'La historia clinica ya ha sido desactivada con anterioridad' })
    } else if (response instanceof Error) {
      res.status(500).json({ message: 'Error interno en el servidor' })
    } else {
      res.status(201).json({ message: 'Hospitalizacion desactivada satisfactoriamente' })
    }
  }
}
