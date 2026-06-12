# Repro: @tanstack/ai-client default no-op devtools bridge throws on first sendMessage

`npm install && npm start`

Expected: both sends succeed.

Actual output with @tanstack/ai-client 0.16.3:

```
first send threw: this.devtoolsBridge.mountWithTools is not a function
messages after first send: 0 (user message was lost)
second send: ok
messages after second send: 2
```

The first `sendMessage()` throws before the user message is appended; the second
appears to work because `mountDevtools()` marks itself done before the call that
throws.
