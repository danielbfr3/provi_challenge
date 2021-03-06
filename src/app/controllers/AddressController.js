import * as Yup from 'yup';
import Correios from 'node-correios';
import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cep: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const addressExists = await Address.findOne({
      where: {
        cep: req.body.cep,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        city: req.body.city,
        state: req.body.state,
      },
    });

    if (addressExists) {
      return res.status(400).json({
        error: 'Address already exists',
      });
    }

    const correios_api = new Correios();
    const cleanedCpf = req.body.cep.replace('-', '');
    const correiosApiResponse = await correios_api.consultaCEP({
      cep: cleanedCpf,
    });

    /**
 * {
  cep: '01312-001',
  logradouro: 'Avenida Nove de Julho',
  complemento: 'de 1300 a 2300 - lado par',
  bairro: 'Bela Vista',
  localidade: 'São Paulo',
  uf: 'SP',
  unidade: '',
  ibge: '3550308',
  gia: '1004'
}

 */

    const { id, number, complement, city, state } = await Address.create(
      req.body
    );

    return res.json({
      id,
      cep,
      street,
      number,
      complement,
      city,
      state,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cep: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Error',
      });
    }

    const addressExists = await Address.findOne({
      where: {
        cep: req.body.cep,
        street: req.body.street,
        number: req.body.number,
        complement: req.body.complement,
        city: req.body.city,
        state: req.body.state,
      },
    });

    if (addressExists) {
      return res.status(400).json({
        error: 'Address already exists',
      });
    }

    const address = await Address.findByPk(req.userId);

    const {
      id,
      cep,
      street,
      number,
      complement,
      city,
      state,
    } = await address.update(req.body);

    return res.json({
      id,
      cep,
      street,
      number,
      complement,
      city,
      state,
    });
  }
}

export default new AddressController();
