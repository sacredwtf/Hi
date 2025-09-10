import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

export function DashboardGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Main Stats */}
      <Card className="neo-depth border-0 bg-card/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono font-bold">2,847</div>
          <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="neo-depth border-0 bg-card/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono font-bold">1,234</div>
          <p className="text-xs text-muted-foreground mt-1">+5% from yesterday</p>
        </CardContent>
      </Card>

      <Card className="neo-depth border-0 bg-card/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">Operational</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">All systems running</p>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="neo-depth border-0 bg-card/60 backdrop-blur-sm md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="neo-depth-subtle h-auto p-4 flex-col gap-2 bg-transparent">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-mono text-sm">+</span>
              </div>
              <span className="text-xs">Add User</span>
            </Button>

            <Button variant="outline" className="neo-depth-subtle h-auto p-4 flex-col gap-2 bg-transparent">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-mono text-sm">⚙</span>
              </div>
              <span className="text-xs">Configure</span>
            </Button>

            <Button variant="outline" className="neo-depth-subtle h-auto p-4 flex-col gap-2 bg-transparent">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-mono text-sm">📊</span>
              </div>
              <span className="text-xs">Reports</span>
            </Button>

            <Button variant="outline" className="neo-depth-subtle h-auto p-4 flex-col gap-2 bg-transparent">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-mono text-sm">🔒</span>
              </div>
              <span className="text-xs">Security</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
