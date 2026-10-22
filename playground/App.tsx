// Your playground: see the component you're building in a real browser.
//
// 1. Run `npm run dev` and open the address it prints.
// 2. Import the component you're working on and render it inside <Demo>, e.g.
//
//      import { Counter } from "../exercises/level03_state_and_events/ex01_counter";
//      ...
//      <Demo title="Counter">
//        <Counter min={0} max={5} />
//      </Demo>
//
// The page reloads by itself every time you save. Nothing in this folder
// is tested, so experiment freely.
//
// The look comes from shadcn/ui (https://ui.shadcn.com). Components live in
// playground/components/ui and import like this:
//
//      import { Button } from "@/components/ui/button";
//
// Add more with `npx shadcn@latest add <name>`, e.g. `add dropdown-menu`.

import type { ReactNode } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function Demo({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>What you're building, live.</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function App() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          reactor playground
        </h1>
        <Badge variant="secondary">dev</Badge>
      </header>

      <p className="text-muted-foreground">
        Edit{' '}
        <code className="rounded bg-muted px-1.5 py-0.5">
          playground/App.tsx
        </code>{' '}
        to render the component you're working on.
      </p>

      <Demo title="Hello">
        <Button onClick={() => alert('shadcn/ui is working')}>Click me</Button>
      </Demo>
    </main>
  );
}
