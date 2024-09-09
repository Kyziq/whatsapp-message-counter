import { ModeToggle } from '@/components/mode-toggle';
import { ThemeProvider } from '@/components/theme-provider';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { MessageCircle } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <div>
          <header>
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold flex items-center">
                <MessageCircle className="mr-2 h-6 w-6 text-green-600" />
                WhatsApp Message Counter
              </h1>
              <ModeToggle />
            </div>
          </header>

          <hr />
          <main>
            <Outlet />
          </main>
          <TanStackRouterDevtools />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}
