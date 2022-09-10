import type { Request } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (request: Request, data?:Record<string, unknown>) => {
    let body = {};
    let status = 500;


    switch (request.method.toUpperCase()){
        case "GET":
            if (data.uid) {
                body = await prisma.diaries.findMany({where: {
                    uid: data.uid
                }})
                status = 200;
                break;
            } else {
                status = 200;
            }

        case "POST":
            body = await prisma.diaries.create({
                data: {
                    content: data.content as string,
                    date: data.date as Date,
                    uid: data.uid as string
                }
            });
            status=201;
            break;

        default:
            break;
    }

    if (request.method.toUpperCase() !== "GET" && request.headers.accept !== "application/json"){
        return {
            status: 303,
            headers: {
                location: "/diary"
            }
        }
    }
    return {
        status,
        body
    }
}
