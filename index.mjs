import { ChatClient } from '@tanstack/ai-client'

// Static SSE response so the repro needs no server or API key.
const sse = [
  'data: {"type":"RUN_STARTED","threadId":"t","runId":"r"}\n\n',
  'data: {"type":"TEXT_MESSAGE_CONTENT","messageId":"m","model":"test","timestamp":0,"delta":"Hi","content":"Hi"}\n\n',
  'data: {"type":"RUN_FINISHED","threadId":"t","runId":"r","model":"test","timestamp":0,"finishReason":"stop"}\n\n',
].join('')

const client = new ChatClient({
  fetcher: () =>
    new Response(sse, { headers: { 'Content-Type': 'text/event-stream' } }),
})

try {
  await client.sendMessage('hello')
  console.log('first send: ok')
} catch (error) {
  console.log('first send threw:', error.message)
}
console.log('messages after first send:', client.getMessages().length, '(user message was lost)')

try {
  await client.sendMessage('hello again')
  console.log('second send: ok')
} catch (error) {
  console.log('second send threw:', error.message)
}
console.log('messages after second send:', client.getMessages().length)
