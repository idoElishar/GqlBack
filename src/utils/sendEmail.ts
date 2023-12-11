import nodemailer from 'nodemailer';


export const sendVerificationEmail = async (email: string, url: string) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'idoelishar81@gmail.com',
            pass: 'oqni opjs ggto cpjo'
        }
    });

    const mailOptions = {
        from: 'idoelishar81@gmail.com',
        to: email,
        subject: 'Password Reset',
        html: `<p>You requested a password reset. Click <a href="${url}">here</a> to reset your password.</p>`
    };

    await transporter.sendMail(mailOptions);
};
