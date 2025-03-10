import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountSettings from './accountSettings';
import PasswordSettings from "./passwordSettings";


export default function SettingsPage({ onClose }: { onClose?: () => void }) {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="mb-2">
                <TabsTrigger value="account">Account Details</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account"><AccountSettings onClose={onClose} /></TabsContent>
            <TabsContent value="password"><PasswordSettings onClose={onClose} /></TabsContent>
        </Tabs>

    )
}