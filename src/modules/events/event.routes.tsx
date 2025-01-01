import { RouteObject } from "react-router-dom";
import EventListPage from "./pages/EventListPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventDetailPage from "./pages/EventDetailPage";
import NewEventPartial from "./partials/NewEventPartial";

export const eventRoutes: RouteObject[] = [
  {
    path: "events",
    element: <EventListPage />,
    children: [
      {
        path: 'new',
        element: <NewEventPartial />
      }
    ],
  },
  {
    path: "events/create",
    element: <CreateEventPage />,
  },
  {
    path: "events/:id/view",
    element: <EventDetailPage />,
  },
  {
    path: "events/:id/edit",
    element: <EditEventPage />,
  },
];
