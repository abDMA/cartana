import { mailtrapClient, sender } from "./mailTrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, sendCardsTemail, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

export const sendVerficationEmail = async (email,verificationToken)=>{
    const recepient =[{email}]
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"التحقق من البريد الإلكتروني",
            html:VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}',verificationToken),
            category:"التحقق من البريد الإلكتروني"
        })
        console.log('email sent successfully',response);
        
    } catch (error) {
        console.log("erro with email",error);
        
        throw new Error(`err sending verification email :${error}`)
    }
}
export const sendPasswordForgetEmail = async (email,resetPasswordToken)=>{
    const recepient =[{email}]
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"إعادة تعيين كلمة المرور",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}',resetPasswordToken),
            category:'إعادة تعيين كلمة المرور'
        })
        console.log('Password reset email sent successfully',response);
        
    } catch (error) {
        console.log("erro with reset password",error);
        
        throw new Error(`err sending password reset email :${error}`)
    }
}
export const sendSuccessEmailMessage = async (email)=>{
    const recepient =[{email}]
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"نجاح إعادة تعيين كلمة المرور",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"نجاح إعادة تعيين كلمة المرور"
        })
        console.log('Password reset email sent successfully',response);
        
    } catch (error) {
        console.log("erro with reset password",error);
        
        throw new Error(`err sending password reset email :${error}`)
    }
}

export const sendCardsToCustomer = async (email,chosenCard)=>{
    const recepient =[{email}]
    const EmailHTML = sendCardsTemail(chosenCard)
    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:recepient,
            subject:"البطاقات التي تم شرائها",
            html:EmailHTML,
            category:"البطاقات التي تم شرائها"
        })
        console.log('email sent successfully',response);
        
    } catch (error) {
        console.log("erro with email",error.message);
        
        throw new Error(`err sending cards to user:${error.message}`)
    }
}