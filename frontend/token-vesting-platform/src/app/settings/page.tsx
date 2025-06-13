import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Moon, Sun, Bell } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 bg-gradient-to-br from-slate-900 via-slate-800 to-black min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-400 drop-shadow-lg">Settings</h1>
        <p className="text-emerald-200 mt-2">Manage your account and application preferences</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-emerald-700/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-400">
              <Settings className="h-5 w-5 text-emerald-400" />
              <span>Account Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display-name" className="text-emerald-200">Display Name</Label>
              <Input id="display-name" placeholder="Enter your display name" className="bg-slate-900 border-emerald-700/40 text-white placeholder:text-emerald-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-emerald-200">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" className="bg-slate-900 border-emerald-700/40 text-white placeholder:text-emerald-200" />
            </div>
            <Button className="bg-gradient-to-r from-emerald-500 to-green-700 text-white">Save Changes</Button>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-emerald-700/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-400">
              <Bell className="h-5 w-5 text-emerald-400" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-emerald-200">Email Notifications</p>
                <p className="text-sm text-emerald-200">Receive email notifications for important events</p>
              </div>
              <div className="h-6 w-11 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer">
                <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-emerald-200">Push Notifications</p>
                <p className="text-sm text-emerald-200">Receive push notifications for important events</p>
              </div>
              <div className="h-6 w-11 bg-emerald-500 rounded-full relative cursor-pointer">
                <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-emerald-700/40 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-emerald-400">
              <Sun className="h-5 w-5 text-emerald-400" />
              <span>Appearance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-4">
                <Sun className="h-8 w-8 mb-2" />
                <span>Light</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-4">
                <Moon className="h-8 w-8 mb-2" />
                <span>Dark</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-24 p-4 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700"
              >
                <div className="flex items-center space-x-1 mb-2">
                  <Sun className="h-4 w-4" />
                  <Moon className="h-4 w-4" />
                </div>
                <span>System</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-emerald-700/40 shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Permanently delete your account and all associated data
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
