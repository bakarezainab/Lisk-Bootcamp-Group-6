// "use client"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ArrowLeft, Shield, Plus, Users, BarChart3 } from "lucide-react"
// import Link from "next/link"
// import { WalletButton } from "@/components/wallet/wallet-button"
// import { NetworkIndicator } from "@/components/wallet/network-indicator"
// import { AdminStats } from "@/components/admin/admin-stats"
// import { CreateVestingForm } from "@/components/admin/create-vesting-form"
// import { VestingScheduleTable } from "@/components/admin/vesting-schedule-table"

// export function AdminDashboard() {
//   return (
//     <div className="min-h-screen bg-[#101010]">
//       {/* Header */}
//       <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <Link href="/" className="btn text-slate-300 hover:text-white">
//                 {/* <Button variant="ghost" size="sm" > */}
//                 <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
//                 <span className="hidden sm:inline">Back to Home</span>
//                 <span className="sm:hidden">Back</span>
//                 {/* </Button> */}
//               </Link>
//               <div className="flex items-center space-x-2">
//                 <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-green-800 rounded-lg flex items-center justify-center">
//                   <Shield className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
//                 </div>
//                 <h1 className="text-lg sm:text-xl font-bold text-white">
//                   <span className="hidden sm:inline">Admin Portal</span>
//                   <span className="sm:hidden">Admin</span>
//                 </h1>
//               </div>
//             </div>

//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <div className="hidden sm:block">
//                 <NetworkIndicator />
//               </div>
//               <WalletButton />
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
//         <div className="mb-6 sm:mb-8">
//           <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
//           <p className="text-slate-300 text-sm sm:text-base">Manage vesting schedules and monitor platform activity</p>
//         </div>

//         {/* Stats Overview */}
//         <div className="mb-6 sm:mb-8">
//           <AdminStats />
//         </div>

//         {/* Main Tabs */}
//         <Tabs defaultValue="create" className="space-y-4 sm:space-y-6 py-6">
//           <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
//             <TabsTrigger value="create" className="data-[state=active]:bg-green-600 text-xs sm:text-sm cursor-pointer">
//               <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Create Vesting</span>
//               <span className="sm:hidden">Create</span>
//             </TabsTrigger>
//             <TabsTrigger value="manage" className="data-[state=active]:bg-green-600 text-xs sm:text-sm cursor-pointer">
//               <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Manage Schedules</span>
//               <span className="sm:hidden">Manage</span>
//             </TabsTrigger>
//             <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600 text-xs sm:text-sm cursor-pointer">
//               <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
//               <span className="hidden sm:inline">Analytics</span>
//               <span className="sm:hidden">Stats</span>
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="create" className="space-y-4 sm:space-y-6">
//             <CreateVestingForm />
//           </TabsContent>

//           <TabsContent value="manage" className="space-y-4 sm:space-y-6">
//             <VestingScheduleTable />
//           </TabsContent>

//           <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
//             <Card className="bg-slate-800/50 border-slate-700">
//               <CardHeader>
//                 <CardTitle className="text-white">Platform Analytics</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-slate-400">Analytics dashboard coming soon...</p>
//               </CardContent>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </main>
//     </div>
//   )
// }


"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Shield, Plus, Users, BarChart3 } from "lucide-react"
import Link from "next/link"
import { WalletButton } from "@/components/wallet/wallet-button"
import { NetworkIndicator } from "@/components/wallet/network-indicator"
import { AdminStats } from "@/components/admin/admin-stats"
import { CreateVestingForm } from "@/components/admin/create-vesting-form"
import { VestingScheduleTable } from "@/components/admin/vesting-schedule-table"
import { AdminProtection } from "@/components/admin/admin-protection"

export function AdminDashboard() {
  return (
    <AdminProtection>
      <div className="min-h-screen bg-[#101010]">
        {/* Header */}
        <header className="border-b border-slate-700 bg-slate-900/80 backdrop-blur-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Link href="/" className="btn text-slate-300 hover:text-white bg-emerald-600">
                  {/* <Button variant="ghost" size="sm" > */}
                  <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Back</span>
                  {/* </Button> */}
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-green-800 rounded-lg flex items-center justify-center">
                    <Shield className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold text-white">
                    <span className="hidden sm:inline">Admin Portal</span>
                    <span className="sm:hidden">Admin</span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:block">
                  <NetworkIndicator />
                </div>
                <WalletButton />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Admin Dashboard</h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Manage vesting schedules and monitor platform activity
            </p>
          </div>

          {/* Stats Overview */}
          <div className="mb-6 sm:mb-8">
            <AdminStats />
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="create" className="space-y-4 sm:space-y-6 py-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
              <TabsTrigger
                value="create"
                className="data-[state=active]:bg-emerald-600 text-xs sm:text-sm cursor-pointer"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Create Vesting</span>
                <span className="sm:hidden">Create</span>
              </TabsTrigger>
              <TabsTrigger
                value="manage"
                className="data-[state=active]:bg-emerald-600 text-xs sm:text-sm cursor-pointer"
              >
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Manage Schedules</span>
                <span className="sm:hidden">Manage</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-emerald-600 text-xs sm:text-sm cursor-pointer"
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4 sm:space-y-6">
              <CreateVestingForm />
            </TabsContent>

            <TabsContent value="manage" className="space-y-4 sm:space-y-6">
              <VestingScheduleTable />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Platform Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AdminProtection>
  )
}
