import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { declinedemailTemplate, acceptedemailTemplate } from "@/utils/emailTemplate";

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


export function acceptedemail(bookname: string, reqbook:string, owner:string, user:string):any {
    const template = Handlebars.compile(acceptedemailTemplate);
    const htmlbody = template({
        bookname:bookname,
        owner:owner,
        reqbook:reqbook,
        user:user  
    })
    return htmlbody
}

export function declineemail(bookname: string, reqbook:string, owner:string, user:string) {
    const template = Handlebars.compile(declinedemailTemplate)
    const htmlbody = template({
        bookname:bookname,
        owner:owner,
        reqbook:reqbook,
        user:user  
    })
    return htmlbody
}

export function returnemail(bookname: string, reqbook:string, owner:string, user:string) {
    const template = Handlebars.compile(declinedemailTemplate)
    const htmlbody = template({
        bookname:bookname,
        owner:owner,
        reqbook:reqbook,
        user:user  
    })
    return htmlbody
}
