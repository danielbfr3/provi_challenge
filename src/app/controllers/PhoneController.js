import * as Yup from 'yup';
import Phone from '../models/Phone';

class PhoneController {
  async store(req, res) {
    const schema = Yup.object().shape({
      phone: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const phoneExists = await Phone.findOne({
      where: {
        phone: req.body.phone,
      },
    });

    if (phoneExists) {
      return res.status(400).json({
        error: 'Phone already exists',
      });
    }

    const { id, user_id, phone } = await Phone.create({
      user_id: req.user_id,
      phone: req.body.phone,
    });

    return res.json({
      id,
      user_id,
      phone,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      phone: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const phoneExists = await Phone.findOne({
      where: {
        phone: req.body.phone,
      },
    });

    if (phoneExists) {
      return res.status(400).json({
        error: 'Phone already exists',
      });
    }

    const phoneObj = await Phone.findByPk(req.user_id);

    const { id, user_id, phone } = await phoneObj.update(req.body);

    return res.json({
      id,
      user_id,
      phone,
    });
  }
}

export default new PhoneController();
