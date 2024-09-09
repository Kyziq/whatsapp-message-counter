import { Link, RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// Set up a Router instance
const router = createRouter({
  routeTree,
  basepath: '/whatsapp-message-counter',
  defaultPreload: 'intent',
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Not found!</p>
      </div>
    );
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
