export default interface Contact {
    fullName: string | null;
    phone: string | null;
    email: string | null;
    message: string | null;
}

export const testContact: Contact = {
    fullName: "Mohammed Aydan",
    phone: "+201552955862",
    email: "mohammedaydan12@gmail.com",
    message: "Hello, I'm interested in your services. Please contact me as soon as possible.",
};
