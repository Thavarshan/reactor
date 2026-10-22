/**
 * Tests for exercises/level11_accessible_patterns/ex04_toast_notifications.tsx
 *
 * Write your tests here first, run them and watch them fail, then build
 * the component until they pass. The "EDGE CASES TO TEST" section of the
 * exercise lists good cases to cover. Turn each `it.todo` into a real test.
 *
 * Run just this file:
 *     npm test -- ex04_toast_notifications
 */

import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ToastProvider, useToast } from './ex04_toast_notifications';

// A tiny component that uses the hook, so tests can click to show toasts.
function SaveButton({ message = 'Saved' }: { message?: string }) {
  const { showToast } = useToast();
  return <button onClick={() => showToast(message)}>Show {message}</button>;
}

describe('ToastProvider + useToast', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  // Examples to get you started:
  //
  // it("shows a toast inside the status container", async () => {
  //   const user = userEvent.setup();
  //   render(<ToastProvider><SaveButton /></ToastProvider>);
  //   await user.click(screen.getByRole("button", { name: "Show Saved" }));
  //   const status = screen.getByRole("status");
  //   expect(within(status).getByRole("listitem")).toHaveTextContent("Saved");
  //   expect(within(status).getByRole("button", { name: "Dismiss Saved" })).toBeInTheDocument();
  // });
  //
  // it("removes a toast after 5000 ms", () => {
  //   vi.useFakeTimers();
  //   render(<ToastProvider><SaveButton /></ToastProvider>);
  //   fireEvent.click(screen.getByRole("button", { name: "Show Saved" }));
  //   act(() => { vi.advanceTimersByTime(5000); });
  //   expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  // });

  it.todo('renders the status container in document.body even with no toasts');
  it.todo('shows several toasts oldest first');
  it.todo('keeps a toast until exactly `duration` ms');
  it.todo('gives each toast its own timer');
  it.todo('uses a custom duration');
  it.todo('removes only the dismissed toast and cancels its timer');
  it.todo('makes two toasts for the same message twice');
  it.todo('leaves no timers pending after unmount');
  // For the last two, renderHook is handy:
  //   renderHook(() => useToast(), { wrapper: ToastProvider })
  it.todo('throws when useToast is used outside a ToastProvider');
  it.todo('keeps showToast the same function after a re-render');
});
