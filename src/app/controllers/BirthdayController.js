import * as Yup from 'yup';
import Birthday from '../models/Birthday';

class BirthdayController {
  async store(req, res) {
    const schema = Yup.object().shape({
      birthday: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const birthdayExists = await Birthday.findOne({
      where: {
        birthday: req.body.birthday,
      },
    });

    if (birthdayExists) {
      return res.status(400).json({
        error: 'Birthday already exists',
      });
    }

    const { id, user_id, birthday } = await Birthday.create({
      user_id: req.user_id,
      birthday: req.body.birthday,
    });

    return res.json({
      id,
      user_id,
      birthday,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      birthday: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const birthdayExists = await Birthday.findOne({
      where: {
        birthday: req.body.birthday,
      },
    });

    if (birthdayExists) {
      return res.status(400).json({
        error: 'Birthday already exists',
      });
    }

    const birthdayObj = await Birthday.findByPk(req.user_id);

    const { id, user_id, birthday } = await birthdayObj.update(req.body);

    return res.json({
      id,
      user_id,
      birthday,
    });
  }
}

export default new BirthdayController();
