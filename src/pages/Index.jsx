import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@/components/ui/navigation-menu";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: "Review project proposal", time: "10:00 - 10:30" },
    { id: 2, name: "Team meeting", time: "14:00 - 15:00" },
    { id: 3, name: "Client call", time: "16:30 - 17:45" },
    { id: 4, name: "Submit report", time: "16:00 - 16:30" },
  ]);

  const [meetings, setMeetings] = useState([
    { id: 1, name: "Budget review", user: "Alice" },
    { id: 2, name: "Project kick-off", user: "Mark" },
    { id: 3, name: "Task delegation", user: "Sarah" },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, user: "John", time: "3:30 PM", message: "Let's finalize the project plan today." },
    { id: 2, user: "Alice", time: "3:45 PM", message: "I'm tied up with client calls. Can you handle it?" },
    { id: 3, user: "Favi", time: "Today", message: "Help needed with the new task." },
    { id: 4, user: "Proj", time: "Today", message: "Feedback needed on project content. Please review the file." },
    { id: 5, user: "Favi", time: "Today", message: "Let's schedule a call for further discussion." },
  ]);

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-gray-800 p-4 mb-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-lg font-bold">Dashboard</Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link to="/about">About</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link to="/contact">Contact</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Profiles</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link to="/profiles">All Profiles</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/profiles/my-profile">My Profile</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link to="/categories">All Categories</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/categories/web-development">Web Development</NavigationMenuLink>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="/categories/graphic-design">Graphic Design</NavigationMenuLink>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
            </CardHeader>
            <CardContent>
              <Avatar>
                <AvatarImage src="/images/user-avatar.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <p>Your tasks for today:</p>
              <ul>
                {tasks.map(task => (
                  <li key={task.id} className="flex justify-between items-center mb-2">
                    <span>{task.name}</span>
                    <span>{task.time}</span>
                    <Button variant="outline">Edit</Button>
                    <Button variant="outline">Assign</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {meetings.map(meeting => (
                  <li key={meeting.id} className="flex justify-between items-center mb-2">
                    <span>{meeting.user} scheduled a {meeting.name}</span>
                    <Button variant="outline">Confirm</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Task Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex">
                <div className="w-1/3">
                  <h2 className="text-lg font-bold">Recent Tasks</h2>
                  <ScrollArea className="h-64">
                    <ul>
                      {tasks.map(task => (
                        <li key={task.id} className="mb-2 p-2 border rounded">
                          <Link to={`/tasks/${task.id}`}>{task.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
                <div className="w-2/3">
                  <h2 className="text-lg font-bold">Project Tasks</h2>
                  <ScrollArea className="h-64">
                    <ul>
                      {tasks.map(task => (
                        <li key={task.id} className="mb-2 p-2 border rounded">
                          <Link to={`/tasks/${task.id}`}>{task.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Tasks completed this week: 8</p>
              <p>Projects in progress this week: 16</p>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <ul>
                  {messages.map(message => (
                    <li key={message.id} className="mb-2 p-2 border rounded">
                      <div className="flex justify-between items-center">
                        <span>{message.user}</span>
                        <span>{message.time}</span>
                      </div>
                      <p>{message.message}</p>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <form className="mt-4">
                <Label htmlFor="message">Enter your message here...</Label>
                <Textarea id="message" />
                <Button type="submit">Send</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Avatar>
                <AvatarImage src="/images/user-avatar.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <p>Project Overview</p>
              <p>Currently online</p>
              <div className="flex space-x-2">
                <Button variant="outline">Chat</Button>
                <Button variant="outline">Call</Button>
                <Button variant="outline">Video</Button>
              </div>
              <p>Job Title: Project Consultant</p>
              <p>Contact: john.doe@example.com</p>
              <p>Call: Not Available</p>
              <p>Timezone: Today at 11:58 AM</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <p>&copy; 2023 Service Platform. All rights reserved.</p>
            <div className="space-x-4">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-300 hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default Index;