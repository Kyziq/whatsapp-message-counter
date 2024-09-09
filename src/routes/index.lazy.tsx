import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWhatsAppCounterStore } from '@/stores';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { BarChart2, FileText, MessageCircle, Upload } from 'lucide-react';
import type React from 'react';

// Create a client
const queryClient = new QueryClient();

export const Route = createLazyFileRoute('/')({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <WhatsAppCounter />
    </QueryClientProvider>
  ),
});

interface Results {
  account1: { name: string; count: number };
  account2: { name: string; count: number };
}

function useProcessFile() {
  const queryClient = useQueryClient();
  const setResults = useWhatsAppCounterStore((state) => state.setResults);

  return useMutation({
    mutationFn: async (file: File): Promise<Results> => {
      const text = await file.text();
      const lines = text.split('\n');
      const messageCount: { [key: string]: number } = {};

      for (const line of lines) {
        const match = line.match(/\[(.*?)\] (.*?):/);
        if (match) {
          const [, , sender] = match;
          messageCount[sender] = (messageCount[sender] || 0) + 1;
        }
      }

      const sortedUsers = Object.entries(messageCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2);

      const results = {
        account1: {
          name: sortedUsers[0][0],
          count: sortedUsers[0][1],
        },
        account2: {
          name: sortedUsers[1][0],
          count: sortedUsers[1][1],
        },
      };

      setResults(results);
      return results;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['results'], data);
    },
  });
}

function WhatsAppCounter() {
  const { file, results, setFile } = useWhatsAppCounterStore();
  const processFile = useProcessFile();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (file) {
      processFile.mutate(file);
    }
  };

  return (
    <div className="flex flex-col">
      <SEO
        title="WhatsApp Message Counter"
        description="Count messages in your WhatsApp chats"
      />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="lg:w-1/2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-green-600" />
                    How to use
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>
                      Go to the WhatsApp chat you wish to count the messages in.
                    </li>
                    <li>
                      Export the chat (without media) to obtain a .txt file.
                    </li>
                    <li>Upload the file to analyze message count.</li>
                  </ol>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5 text-green-600" />
                    Upload Chat File
                  </CardTitle>
                  <CardDescription>
                    Select your exported WhatsApp chat file to analyze
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg  transition-colors hover:border-green-500">
                        <div className="text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <span className="mt-2 block text-sm font-medium text-gray-600">
                            {file ? file.name : 'Select a .txt file'}
                          </span>
                        </div>
                      </div>
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".txt"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </Label>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 dark:text-white"
                      disabled={!file || processFile.isPending}
                    >
                      {processFile.isPending
                        ? 'Processing...'
                        : 'Analyze Messages'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="lg:w-1/2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart2 className="mr-2 h-5 w-5 text-green-600" />
                    Results
                  </CardTitle>
                  <CardDescription>
                    Message count per WhatsApp account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {results.account1 || results.account2 ? (
                    <ul className="space-y-4">
                      {[results.account1, results.account2]
                        .filter(Boolean)
                        .map((result, index) => (
                          <li
                            key={result?.name || index}
                            className="flex justify-between items-center py-2 border-b last:border-b-0"
                          >
                            <span className="font-medium">{result?.name}</span>
                            <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                              {result?.count} messages
                            </span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p>Upload a file to see the message count results.</p>
                    </div>
                  )}
                  {processFile.isError && (
                    <div className="mt-4 text-red-500">
                      Error processing file. Please try again.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WhatsAppCounter;
