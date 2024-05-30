import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { declinedemailTemplate, acceptedemailTemplate, returnemailTemplate, requestemailTemplate } from "@/utils/emailTemplate";

interface email {
    email:string|undefined
    password:string|undefined
}

export const email:email = {
    email:process.env.EMAIL,
    password:process.env.EMAIL_PASSWORD
} 

export const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email.email,
        pass: email.password
    }
})


export function acceptedemail(bookname: string, reqbook:string, owner:string, user:string, image:string, logo:string) {
    const template = Handlebars.compile(acceptedemailTemplate);
    const htmlbody = template({
        bookname:bookname,
        owner:owner,
        reqbook:reqbook,
        user:user,
        image:image,
        logo:logo  
    })
    return htmlbody
}

export function declineemail(bookname: string, reqbook:string, owner:string, user:string, image:string, logo:string) {
    const template = Handlebars.compile(declinedemailTemplate)
    const htmlbody = template({
        bookname:bookname,
        owner:owner,
        reqbook:reqbook,
        user:user,
        image:image,
        logo:logo  
    })
    return htmlbody
}

export function returnemail(bookname: string, reqbook:string, owner:string, user:string, image:string, logo:string) {
    const template = Handlebars.compile(returnemailTemplate)
    const htmlbody = template({
        bookname:bookname,
        owner:owner,
        reqbook:reqbook,
        user:user,
        image:image,
        logo:logo
    })
    return htmlbody
}

export function requestemail(bookname: string, reqbook:string, owner:string, user:string, image:string, logo:string) {
    const template = Handlebars.compile(requestemailTemplate)
    const htmlbody = template({
        bookname:bookname,
        owner:owner,
        reqbook:reqbook,
        user:user,
        image:image,
        logo:logo
    })
    return htmlbody
}
