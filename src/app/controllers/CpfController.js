import * as Yup from 'yup';
import Cpf from '../models/Cpf';
import validateCPF from '../../lib/validateCPF';

class CpfController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const validCPF = validateCPF(req.body.cpf);

    if (!validCPF) {
      return res.status(400).json({
        error: 'CPF number is not valid',
      });
    }

    const cpfExists = await Cpf.findOne({
      where: {
        cpf: req.body.cpf,
      },
    });

    if (cpfExists) {
      return res.status(400).json({
        error: 'CPF already exists',
      });
    }

    const { id, user_id, cpf } = await Cpf.create({
      user_id: req.user_id,
      cpf: req.body.cpf,
    });

    return res.json({
      id,
      user_id,
      cpf,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const validCPF = validateCPF(req.body.cpf);

    if (!validCPF) {
      return res.status(400).json({
        error: 'CPF number is not valid',
      });
    }

    const cpfExists = await Cpf.findOne({
      where: {
        cpf: req.body.cpf,
      },
    });

    if (cpfExists) {
      return res.status(400).json({
        error: 'CPF already exists',
      });
    }

    const cpfObj = await Cpf.findByPk(req.user_id);

    const { id, user_id, cpf } = await cpfObj.update(req.body);

    return res.json({
      id,
      user_id,
      cpf,
    });
  }
}

export default new CpfController();
