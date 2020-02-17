import Registration from '../schemas/Registration';
import RegistrationType from '../schemas/RegistrationType';

class RegistrationController {
  async store(req, res) {
    const hasRegistrationInProcess = await Registration.find({
      id: req.user_id,
    }).limit(1);

    if (hasRegistrationInProcess) {
      return res.status(401).json({
        error: 'You already have a registration in progress.',
      });
    }

    const mostRecentRegistrationType = await RegistrationType.find({})
      .sort({ createdAt: 'desc' })
      .limit(1);

    if (!mostRecentRegistrationType) {
      return res.status(401).json({
        error: 'No registration type found for this user',
      });
    }

    const registrationProcessCreated = await Registration.create({
      user_id: req.user_id,
      registration_type: mostRecentRegistrationType[0].id,
      steps_done: [],
    });

    return res.json(registrationProcessCreated);
  }
}

export default new RegistrationController();
