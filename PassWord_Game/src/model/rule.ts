export interface Rule{
    id: number,
    type : string,
    src?:string,
    rule:string,
    password:string
}


export const rules: Rule[] = [
    {
        id : 1,
        type : "text",
        rule : "Your password should contain India's Prime Minister name",
        password : "narendramodi"
    },
    {
        id : 2,
        type : "text",
        rule : "Your password should contain MS. Dhoni jersey number",
        password : "7"
    },
    {
        id : 3,
        type : "text",
        rule : "Your password should contain answer of differentiation of X",
        password : "1"
    },
    {
        id : 4,
        type : "text",
        rule : "Your password should contain Wednesday pet name",
        password : "thing"
    },
    {
        id : 5,
        type : "text",
        rule : "Your password containing Numbers sum should be 25",
        password : "num"
    },
    {
        id : 6,
        type : "text",
        rule : "Your password should contain name of world's best programming language",
        password : "java"
    },
    {
        id : 7,
        type : "text",
        rule : "Your password should contain Answer of 5 / 0 in a words",
        password : "infinit"
    },
    {
        id : 8,
        type : "image",
        rule : "Your password should contain city name of shown below",
        src : "./public/image/paris.jpg" ,
        password : "paris"
    },
    {
        id : 9,
        type : "text",
        rule : "Your password should contain only One special character",
        password : "spc"
    },
]