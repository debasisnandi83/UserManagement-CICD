export interface IMenu {
    Dashboard?: MenuItem[];
    Menu?: MenuItem[];
    Admin?: MenuItem[];
}

export interface IUsers{
    userDetails?:UserDetail;
    menu?: IMenu;
}

export interface MenuItem{
    resource__id?: number;
    resource__name?: string;
    resource__url?: string;
    resource__parent?: string;
    resource__sequence?: number;
}

export interface UserDetail{
    userid?: number;
    email?: string;
    password?: any;
    username?: string;
    role?: string;
}