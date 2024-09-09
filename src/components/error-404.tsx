import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-89px)] bg-background text-foreground p-4">
      <div className="text-center space-y-6 max-w-md">
        <FileQuestion className="w-24 h-24 text-muted-foreground mx-auto" />
        <h1 className="text-4xl font-bold tracking-tight">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
