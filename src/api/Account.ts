export interface Account {
   platformId : number,
   strategyId : number | null,
   key : string | null,
   secret : string | null,
   name : string,
   isActive : boolean | null
}