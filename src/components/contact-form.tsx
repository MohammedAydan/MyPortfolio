import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const ContactForm = () => {
    return (
        <div className={`w-full p-4 border rounded-2xl mr-4`}>
            <div className="flex w-full gap-4 mt-4">
                <div className="w-full flex flex-col gap-4">
                    <Label htmlFor='full-name' className='w-1/2'>Full Name</Label>
                    <Input id='full-name' placeholder='Enter Full Name' />
                </div>
                <div className="w-full flex flex-col gap-4">
                    <Label htmlFor='phone' className='w-1/2'>Phone Number</Label>
                    <Input id='phone' placeholder='Enter Phone Number' />
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 mt-4">
                <Label htmlFor='email' className='w-1/2'>Email</Label>
                <Input id='email' placeholder='Enter Email' />
            </div>

            <div className="w-full flex flex-col gap-4 mt-4">
                <Label htmlFor='email' className='w-1/2'>Message</Label>
                <Textarea id='email' placeholder='Enter Message' className='h-40' />
            </div>

            <Button className='w-full mt-5'>Send Message</Button>
        </div>
    )
}

export default ContactForm;