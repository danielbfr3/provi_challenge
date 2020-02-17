import * as Yup from 'yup';
import Name from '../models/Name';

class NameController {
  async store(req, res) {
    const schema = Yup.object().shape({
      full_name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const [first, ...rest] = req.body.full_name.split(' ');
    const nameExists = await Name.findOne({
      where: {
        first_name: first,
        last_name: rest.join(' '),
      },
    });

    if (nameExists) {
      return res.status(400).json({
        error: 'Name already exists',
      });
    }

    const { id, user_id, first_name, last_name } = await Name.create({
      user_id: req.user_id,
      full_name: req.body.full_name,
    });

    return res.json({
      id,
      user_id,
      first_name,
      last_name,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      full_name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const [first, ...rest] = req.body.full_name.split(' ');
    const nameExists = await Name.findOne({
      where: {
        first_name: first,
        last_name: rest.join(' '),
      },
    });

    if (nameExists) {
      return res.status(400).json({
        error: 'Name already exists',
      });
    }

    const name = await Name.findByPk(req.user_id);

    const { id, user_id, first_name, last_name } = await name.update(req.body);

    return res.json({
      id,
      user_id,
      first_name,
      last_name,
    });
  }
}

export default new NameController();
