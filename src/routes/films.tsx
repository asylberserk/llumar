import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/films")({
  component: () => <Outlet />,
});
