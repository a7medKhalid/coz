export interface branchType {
    created_at: Date;
    id: number;
    latitude: string;
    longitude: string;
    manager_id?: any;
    name: string;
    updated_at: Date;
}
export interface employeeType {
    branch_id: number;
    created_at: Date;
    email: string;
    email_verified_at: Date;
    id: number;
    name: string;
    updated_at: Date;
}
