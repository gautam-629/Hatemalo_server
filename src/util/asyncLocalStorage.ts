import { NextFunction } from "express";
import { IAsyncLocalStorage } from "../common";
import { createNamespace, getNamespace } from "cls-hooked";
import { User } from "../infrastructure/database/pgSql/entity/User.entity";

export class AsyncLocalStorage implements IAsyncLocalStorage{
    
    private static nameSpace=createNamespace("session")

     setUser(data: User, next: NextFunction): void {
          const session=AsyncLocalStorage.nameSpace;
          session.run(()=>{
              session.set("user",data)
          })
     }

     getUser(): User | null {
         const session=getNamespace("session")
         let user =null
 
         session?.run(()=>{
            user=session.get("user")
         })

         return user;
     }
}