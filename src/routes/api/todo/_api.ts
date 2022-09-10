import type { Request } from "@sveltejs/kit";
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (request: Request, data?:Record<string, unknown>) => {
    let body = {};
    let status = 500;

    switch (request.method.toUpperCase()) {
        case "GET":
            if (data.uid) {
                body = await prisma.todo.findMany({where: {
                    uid: data.uid
                }});
                status = 200;
                
                break;
            } else {
                status = 200;
            }

                
        
        case "POST":
            body = await prisma.todo.create({
                data: {
                    created_at: data.created_at as Date,
                    done: data.done as boolean,
                    content: data.content as string,
                    uid: data.uid as string
                }
            });
            status = 201;
            break;

        case "DELETE":
            await prisma.todo.delete({where: {
                id: request.params.id,
            }})
            status = 200;
            break;

        case "PATCH":
            body = await prisma.todo.update({
                where: {
                    id: request.params.id
                },
                data: {
                    done: data.done,
                    content: data.content
                }
            })
            status = 200;
            break;

        default:
            break;
    }

    if (request.method.toUpperCase() !== "GET"  && request.headers.accept !== "application/json"){
        return {
            status:303,
            headers: {
                location: "/"
            }
        }
    }

    return {
        status,
        body
    }
}