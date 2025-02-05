import Ekadash from '../models/ekadash.js';
import { getMonthStrByNum } from '../utils/helpers.js';
import EkadashInfo from '../models/ekadashInfo.js';
import Ekadashi from '../models/ekadashi.js';

// import { generateSixDigitCode } from '../utils/math.utils';

export const getByYear = async (req, res) => {
  const year = req.query.year;
  try {
    const years = await Ekadash.findOne({ year });
    const ekadash = await Ekadashi.findOne({ year }).populate('description_data');
    console.log('file-ekadash.js ekadash:', ekadash.description_data);
    res.json({ status: true, years });
  } catch (err) {
    console.log('file-ekadashi.js err:', err);
    res.status(500).json({ status: false, message: 'Error getting ekadashi years' });
  }
};

export const getByMonth = async (req, res) => {
  const { year, month } = req.query;
  try {
    const ekadash = await Ekadash.findOne({ year });
    const monthStr = getMonthStrByNum(parseInt(month));
    const ekadashByMonth = ekadash.months[month];
    res.json({ status: true, ekadash });
  } catch (err) {
    console.log('file-ekadashi.js err:', err);
    res.status(500).json({ status: false, message: 'Error getting ekadashi month' });
  }
};

// const sendotp = async (req, res) => {
//   const { email } = req.body;
//   //поиск регистронезависимого email
//   const emailRegExp = new RegExp(`^${email}$`, 'i');
//   try {
//     const user = await User.findOne({ email: { $regex: emailRegExp } }).select(['_id']);
//     if (!user)
//       return res.status(401).json({
//         status: false,
//         message: 'Email not found.'
//       });
//     const otp = generateSixDigitCode();
//     console.log('file-auth.js otp:', otp);
//
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.LEXICAN_TEAM_EMAIL,
//         pass: process.env.GOOGLE_EMAIL_SENDER_PASSWORD
//       }
//     });
//
//     await transporter.sendMail({
//       from: 'lexican.team@gmail.com',
//       to: email,
//       subject: 'Lexican App',
//       html: `Your OTP CODE is: <b>${otp}</b>`
//     });
//     const salt = await bcrypt.genSaltSync(10);
//     user.password = await bcrypt.hashSync(otp, salt);
//     await user.save();
//     user.password = '';
//     res.json({ status: true, message: 'Email sent' });
//   } catch (err) {
//     console.log('file-auth.js err:', err);
//     res.status(500).json({ status: false, message: 'Error sending email' });
//   }
// };
//
// const verifyotp = async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     //поиск регистронезависимого email
//     const emailRegExp = new RegExp(`^${email}$`, 'i');
//     const user = await User.findOne({ email: { $regex: emailRegExp } }).select([
//       'email',
//       'setup',
//       'password'
//     ]);
//     const isPasswordOk = await bcrypt.compareSync(otp, user.password);
//     if (isPasswordOk) {
//       res.json({
//         status: true,
//         message: 'Successful login.\nChange your password in the profile settings.',
//         user
//       });
//     } else {
//       res.status(401).json({ status: false, message: 'Incorrect code.' });
//     }
//   } catch (err) {
//     console.error('verifyOtp error', err);
//     res.status(401).json({ status: false, message: 'Verification error.' });
//   }
// };
//
// const changePassword = async (req, res) => {
//   const { id, password } = req.body;
//   try {
//     const user = await User.findById(id).select(['email', 'setup']);
//     if (user) {
//       const salt = await bcrypt.genSaltSync(10);
//       user.password = await bcrypt.hashSync(password, salt);
//       await user.save();
//       res.json({ status: true, message: 'Password changed', user });
//     } else {
//       res.status(404).json({ status: false, message: 'User not found.' });
//     }
//   } catch (err) {
//     console.error('change password Error:', err);
//     res.status(404).json({ status: false, message: 'Password change error.' });
//   }
// };
//
// const createUser = async (user, res) => {
//   try {
//     await user.save();
//     res.json({ status: true, message: 'User created.', user });
//   } catch (error) {
//     console.error(error);
//     if (error.name === 'MongoServerError' && error.code === 11000) {
//       console.error('error: ', error.message);
//       return res.status(422).json({ status: false, message: 'This email is already taken.' });
//     }
//     if (error.name === 'ValidationError') {
//       console.error('error: ', error.message);
//       return res.status(422).json({ status: false, message: 'Data validation error.' });
//     }
//     // Some other error
//     return res.status(422).json({ status: false, message: error.name });
//   }
// };
