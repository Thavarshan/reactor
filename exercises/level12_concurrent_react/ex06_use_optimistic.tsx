/**
 * Exercise: Chat messages that appear at once (useOptimistic)
 * Level:    12 - Concurrent React
 * Topics:   useOptimistic, form actions, rolling back on failure
 *
 * ========================================================================
 * YOUR TASK
 * ========================================================================
 * Build a <Chat>: a list of messages and a box to send a new one.
 * A sent message appears in the list IMMEDIATELY, marked "Sending...".
 * When the server confirms it, the mark goes away. If the server fails,
 * the message disappears again and an error explains why.
 *
 *     - Hi there!
 *     - Are we still on for lunch?  Sending...
 *
 *     Message [                    ]  [ Send ]
 *
 *     <Chat initialMessages={messages} sendMessage={(text) => api.send(text)} />
 *
 * ========================================================================
 * BACKGROUND: OPTIMISTIC UPDATES
 * ========================================================================
 * An "optimistic update" shows the result of an action BEFORE the
 * server has answered, assuming it will work. It makes an app feel
 * instant.
 *
 * useOptimistic gives you a temporary copy of some state, plus a way to
 * change that copy while an action (an async function started by a form
 * action or by startTransition) is running:
 *
 *     const [likes, setLikes] = useState(10);
 *     const [optimisticLikes, addOptimisticLike] = useOptimistic(
 *       likes,
 *       (current, amount: number) => current + amount,   // how to apply a change
 *     );
 *
 *     async function like() {          // used as <form action={like}>
 *       addOptimisticLike(1);           // the screen shows 11 at once
 *       const total = await api.like();
 *       setLikes(total);                // the real value
 *     }
 *
 * Render `optimisticLikes`, not `likes`. While the action runs, it
 * includes your temporary change. When the action ENDS, React throws the
 * temporary change away and shows the real state again. So if the
 * request fails and you never call the setter, the change simply
 * disappears: the rollback is automatic.
 *
 * ========================================================================
 * WHAT YOUR TESTS CAN FIND
 * ========================================================================
 * - A list <ul aria-label="Messages"> with one <li> per message, oldest
 *   first. The <li> contains the message text.
 * - A message that is still sending also has <small>Sending...</small>
 *   inside its <li>.
 * - When there are no messages at all: <p>No messages yet.</p> instead
 *   of the list.
 * - A <form aria-label="Send a message"> with an input labelled
 *   "Message" (name="message") and a submit button named "Send".
 * - After a failure:
 *   <p role="alert">Could not send "Are we still on?". Please try again.</p>
 *   (with the failed text inside the quotes).
 *
 * ========================================================================
 * THE RULES
 * ========================================================================
 * Your component must:
 * 1. Show `initialMessages` (default: none), oldest first.
 * 2. Send with a form action: `<form action={send}>`, where `send` is
 *    your async function. Read "message" from the FormData and trim it.
 *    An empty message does nothing: no call, nothing added.
 * 3. As soon as a message is sent, show it at the END of the list with
 *    "Sending..." (use useOptimistic).
 * 4. Call `sendMessage(text)`. When it resolves, add the Message it
 *    returns (the server's copy) to your real list. "Sending..." goes
 *    away.
 * 5. When it rejects, the optimistic message disappears and the alert
 *    shows the failed text.
 * 6. Show only the LATEST failure. When a later send has worked, the
 *    old alert is gone.
 * 7. When a send has finished (worked or failed), the input is empty.
 *
 * You can assume:
 * - Tests send one message at a time and wait for the answer.
 *
 * ========================================================================
 * EXAMPLES
 * ========================================================================
 *     initialMessages: [{ id: "1", text: "Hi there!" }]
 *
 *     type "Lunch?" + click "Send"
 *                     ->  list: "Hi there!", "Lunch? Sending..."
 *     server answers { id: "2", text: "Lunch?" }
 *                     ->  list: "Hi there!", "Lunch?"   (no "Sending...")
 *                         input is empty
 *
 *     type "Dinner?" + Enter, server fails
 *                     ->  list: "Hi there!", "Lunch?"
 *                         alert: Could not send "Dinner?". Please try again.
 *
 * ========================================================================
 * EDGE CASES TO TEST
 * ========================================================================
 * - initialMessages show in order, and no messages shows "No messages yet."
 * - A sent message appears at once with "Sending..."
 * - The input is empty once the send has finished
 * - On success, the server's copy replaces it and "Sending..." is gone
 * - On failure, the message disappears and the alert names it
 * - A later send that works removes the old alert
 * - An empty or spaces-only message does nothing
 *
 * ========================================================================
 * HINTS (read only if you get stuck)
 * ========================================================================
 * 1. Real state: `const [messages, setMessages] = useState(initialMessages)`.
 *    Optimistic copy: `useOptimistic(messages, (current, text: string) =>
 *    [...current, { id: "sending", text, sending: true }])`. Give your
 *    message type an optional `sending?: boolean`.
 * 2. Render the OPTIMISTIC list. Show <small>Sending...</small> when
 *    `message.sending` is true.
 * 3. Call the "add optimistic" function INSIDE the form action. Outside
 *    an action, React warns and ignores it.
 * 4. Wrap `await sendMessage(text)` in try/catch. An error thrown out of
 *    a form action crashes the component instead of being handled.
 * 5. Keep the error text in normal state, and clear it in each send.
 *    Note: apart from the optimistic change, the state updates you make
 *    inside an action only show up once the WHOLE action has finished.
 *    So the old alert stays visible until the new send is done.
 * 6. TESTING: control the server answer with a Promise you settle by
 *    hand, and settle it inside an awaited act:
 *        let answer!: (m: Message) => void;
 *        let fail!: (e: Error) => void;
 *        const sendMessage = vi.fn(
 *          () => new Promise<Message>((resolve, reject) => { answer = resolve; fail = reject; }),
 *        );
 *        ... type and click "Send", check "Sending..." ...
 *        await act(async () => answer({ id: "2", text: "Lunch?" }));
 * 7. TESTING: `within(listItem)` searches inside one element only:
 *        const items = within(screen.getByRole("list", { name: "Messages" })).getAllByRole("listitem");
 *        expect(within(items[1]).getByText("Sending...")).toBeInTheDocument();
 * 8. TESTING: React resets the form when the action FINISHES, not when
 *    it starts. So check for an empty input after the answer. Also,
 *    user-event may still remember the old text after a reset. Call
 *    `await user.clear(input)` before typing the next message.
 * 9. TESTING: settle (resolve or reject) every Promise your test hands
 *    out. React treats all running actions as one group, and an action
 *    that never ends can keep "Sending..." on screen in LATER tests too.
 *
 * ========================================================================
 * REACT CONCEPTS TO LEARN
 * ========================================================================
 * - Optimistic updates and why they feel fast
 * - useOptimistic: a temporary state that lives only during an action
 * - Automatic rollback when an action ends
 * - Form actions and FormData
 *
 * ========================================================================
 * STRETCH GOALS
 * ========================================================================
 * - Add a "Retry" button next to the alert that sends the failed text
 *   again.
 * - Allow several messages in flight at once. Give each optimistic
 *   message its own temporary id (for example from a counter).
 * - Scroll the list to the newest message after each send (a ref and
 *   `scrollIntoView`).
 */

import type { ReactElement } from 'react';

export type Message = {
  /** A unique id, chosen by the server. */
  id: string;
  /** What the message says. */
  text: string;
};

export type ChatProps = {
  /** Messages already in the chat, oldest first. Default: none. */
  initialMessages?: Message[];
  /** Sends a message. Resolves with the server's copy, rejects on failure. */
  sendMessage: (text: string) => Promise<Message>;
};

export function Chat({
  initialMessages = [],
  sendMessage,
}: ChatProps): ReactElement {
  // TODO: build me, then make your tests pass.
  throw new Error('Not implemented: Chat');
}
