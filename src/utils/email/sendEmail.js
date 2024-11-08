import nodemailer from "nodemailer"
export const sendEmail=async(email,otpCode)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "abdomohsen20006@gmail.com",
          pass: "ackgppivftmxwsha",
        },
      });
      console.log(email,otpCode);

      const info = await transporter.sendMail({
        from: '"😥 " <abdomohsen20006@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        
        html:`<div>otpCode is ${otpCode} </div>` , // html body
      });
      console.log("Message sent: %s", info.messageId);
}