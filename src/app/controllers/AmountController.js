import * as Yup from 'yup';
import Amount from '../models/Amount';

class AmountController {
  async store(req, res) {
    const schema = Yup.object().shape({
      amount_in_cents: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const amountExists = await Amount.findOne({
      where: {
        phone: req.body.phone,
      },
    });

    if (amountExists) {
      return res.status(400).json({
        error: 'Phone already exists',
      });
    }

    const { id, user_id, amount_in_cents } = await Amount.create({
      user_id: req.user_id,
      phone: req.body.phone,
    });

    return res.json({
      id,
      user_id,
      amount_in_cents,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      amount_in_cents: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const amountExists = await Amount.findOne({
      where: {
        amount_in_cents: req.body.amount_in_cents,
      },
    });

    if (amountExists) {
      return res.status(400).json({
        error: 'Phone already exists',
      });
    }

    const amountObj = await Amount.findByPk(req.user_id);

    const { id, user_id, amount_in_cents } = await amountObj.update(req.body);

    return res.json({
      id,
      user_id,
      amount_in_cents,
    });
  }
}

export default new AmountController();
