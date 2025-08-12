export default interface Contact {
    id?: string | null;
    fullName: string | null;
    phone: string | null;
    email: string | null;
    message: string | null;
    createdAt?: string | null;
    readdAt?: string | null;
}